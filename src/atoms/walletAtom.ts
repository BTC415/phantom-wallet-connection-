import { atom } from 'jotai';

export const walletAtom = atom<string | null>(null);
export const balanceAtom = atom<number | null>(null);
export const transactionResultAtom = atom<{signature: string; success: boolean} | null>(null);
