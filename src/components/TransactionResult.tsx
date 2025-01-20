import { useAtom } from 'jotai';
import { transactionResultAtom } from '../atoms/walletAtom';

const TransactionResult = () => {
  const [transactionResult] = useAtom(transactionResultAtom);

  if (!transactionResult) return null;

  return (
    <div className="mt-4">
      {transactionResult.success ? (
        <div className="text-green-600 font-serif font-black">
          😍Transaction successful!{' '}
          <a
            href={`https://explorer.solana.com/tx/${transactionResult.signature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
           👀 View on Explorer
          </a>
        </div>
      ) : (
        <div className="text-red-600">
          😢Transaction failed. Please try again.
        </div>
      )}
    </div>
  );
};

export default TransactionResult;
