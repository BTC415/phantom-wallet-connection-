"use client";

import React, { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
// import * as anchor from "@project-serum/anchor";
import { getAssociatedTokenAddress, getAccount, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

const Content = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("0");

  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.

  const getTokenBalance = async () => {
    if (!publicKey) {
      console.log("Wallet not connected!");
      return;
    }

    try {
      // Get the associated token address
      const associatedTokenAddress = await getAssociatedTokenAddress(new PublicKey("YOUR_TOKEN_MINT_ADDRESS"), publicKey);

      // Fetch the token account
      const tokenAccount = await getAccount(connection, associatedTokenAddress);

      // Set the balance
      setBalance(tokenAccount.amount.toString());
    } catch (error) {
      console.error("Error fetching token balance:", error);
      setBalance("0");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className="flex flex-row items-center justify-center space-x-2">
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>
      <button onClick={getTokenBalance} className="p-2 bg-blue-500 text-white rounded">
        Balance: {balance}
      </button>
    </div>
  );
};

export default Content;
