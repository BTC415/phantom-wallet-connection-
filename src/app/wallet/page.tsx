"use client";

import React, { FC, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
// import * as anchor from "@project-serum/anchor";
// import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, getAccount } from "@solana/spl-token";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import Content from "./content";

const Wallet: FC = () => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new UnsafeBurnerWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  // const transfer = async () => {
  //   if (!publicKey) {
  //     console.log("Wallet not connected!");
  //     return;
  //   }

  //   // Create a provider
  //   const provider = new anchor.AnchorProvider(connection, window.solana, anchor.AnchorProvider.defaultOptions());

  //   // Create the program interface using the IDL
  //   const programId = new PublicKey("YOUR_PROGRAM_ID_HERE");
  //   const program = new anchor.Program(idl, programId, provider);

  //   try {
  //     // Call the transfer function
  //     const tx = await program.methods
  //       .transfer(new anchor.BN(amount))
  //       .accounts({
  //         from: publicKey,
  //         to: new PublicKey("RECIPIENT_ADDRESS_HERE"),
  //         systemProgram: anchor.web3.SystemProgram.programId,
  //       })
  //       .rpc();

  //     console.log("Transaction signature", tx);
  //   } catch (error) {
  //     console.error("Error in transfer:", error);
  //   }
  // };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Content />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Wallet;
