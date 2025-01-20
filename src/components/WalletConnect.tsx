import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { walletAtom, balanceAtom } from '../atoms/walletAtom';

const DEVNET_ENDPOINT = 'https://api.devnet.solana.com';

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useAtom(walletAtom);
  const [balance, setBalance] = useAtom(balanceAtom);

  const connectWallet = async () => {
    try {
      const { solana } = window as any;

      if (solana) {
        const response = await solana.connect();
        const publicKey = response.publicKey.toString();
        setWalletAddress(publicKey);
        
        const connection = new Connection(DEVNET_ENDPOINT);
        const balance = await connection.getBalance(new PublicKey(publicKey));
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setBalance(null);
  };

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        const { solana } = window as any;
        if (solana?.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });
          const publicKey = response.publicKey.toString();
          setWalletAddress(publicKey);
          
          const connection = new Connection(DEVNET_ENDPOINT);
          const balance = await connection.getBalance(new PublicKey(publicKey));
          setBalance(balance / LAMPORTS_PER_SOL);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      {!walletAddress ? (
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-md"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p>Wallet Address: {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</p>
          <p>Balance in sol: {balance?.toFixed(4)}</p>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={disconnectWallet}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
