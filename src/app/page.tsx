'use client';
import WalletConnect from '../components/WalletConnect';
import TokenTransfer from '../components/TokenTransfer';
import TransactionResult from '../components/TransactionResult';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-5xl font-bold mb-8">SPL Token Transfer</h1>
      <WalletConnect />
      <div className="mt-8">
        <TokenTransfer />
        <TransactionResult />
      </div>
    </main>
  );
}
