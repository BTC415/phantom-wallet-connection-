import { useState } from 'react';
import { useAtom } from 'jotai';
import { Connection, PublicKey } from '@solana/web3.js';
import * as spl from '@solana/spl-token';
import { Program, AnchorProvider, Idl, web3 } from '@project-serum/anchor';
import { walletAtom, transactionResultAtom } from '../atoms/walletAtom';
import { BN } from "bn.js";
import IDLJson from "@/idl/spl_token_transfer.json";

const PROGRAM_ID = "6GmLK8Qz9hBnCa89jcaVoX4b8nKCYc62p4hUbZ5XrsBL";
const DEVNET_ENDPOINT = 'https://api.devnet.solana.com';

const TokenTransfer = () => {
  const [walletAddress] = useAtom(walletAtom);
  const [, setTransactionResult] = useAtom(transactionResultAtom);
  const [tokenAddress, setTokenAddress] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { solana } = window as any;
      if (!solana || !walletAddress) return;
      const payer = new PublicKey(walletAddress);
      const mint = new PublicKey(tokenAddress);
      const recipient = new PublicKey(recipientAddress);

      const connection = new Connection(DEVNET_ENDPOINT);
      const provider = new AnchorProvider(
        connection,
        solana,
        AnchorProvider.defaultOptions()
      );

      const senderATA = spl.getAssociatedTokenAddressSync(
        mint,
        payer,
        true,
        spl.TOKEN_2022_PROGRAM_ID,
      );

      const recipientATA = spl.getAssociatedTokenAddressSync(
        mint,
        recipient,
        true,
        spl.TOKEN_2022_PROGRAM_ID,
      );

      console.log('here :', senderATA.toBase58(), recipientATA.toBase58());

      const toAtaInfo = await connection.getAccountInfo(recipientATA);
      let transaction = new web3.Transaction();
      if (!toAtaInfo) {
        const createAtaIx = spl.createAssociatedTokenAccountInstruction(
          payer,
          recipientATA,
          recipient,
          mint,
          spl.TOKEN_2022_PROGRAM_ID,
        );
        transaction.add(createAtaIx);
      }

      const program = new Program(IDLJson as Idl, PROGRAM_ID, provider);

      const transferIx = await program.methods
        .transferToken2022(new BN(amount))
        .accounts({
          from: payer,
          fromAta: senderATA,
          toAta: recipientATA,
          mint: mint,
          tokenProgram: spl.TOKEN_2022_PROGRAM_ID,
        })
        .transaction();

      transaction.add(transferIx);
      const latestBlockhash = await connection.getLatestBlockhash();
      transaction.recentBlockhash = latestBlockhash.blockhash;
      transaction.feePayer = payer;
      const simRes = await connection.simulateTransaction(transaction);
      if (simRes.value.err) {
        console.log(simRes);
        return;
      }
      const signature = await solana.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signature.signature);
      setTransactionResult({
        signature: signature,
        success: true
      });

    } catch (error) {
      console.error(error);
      setTransactionResult({
        signature: '',
        success: false
      });
    }
  };

  if (!walletAddress) return null;

  return (
    <form onSubmit={handleTransfer} className="flex flex-col gap-4 w-full max-w-md">
      <input
        type="text"
        placeholder="Token Address"
        value={tokenAddress}
        color='text-black'
        onChange={(e) => setTokenAddress(e.target.value)}
        className="border p-2 rounded text-black"
      />
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipientAddress}
        color='text-black'
        onChange={(e) => setRecipientAddress(e.target.value)}
        className="border p-2 rounded text-black"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        color='text-black'
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded text-black"
      />
      <button
        type="submit"
        className="bg-yellow-600 text-white px-4 py-2 rounded-md"
      >
        Token Transfer
      </button>
    </form>
  );
};

export default TokenTransfer;
