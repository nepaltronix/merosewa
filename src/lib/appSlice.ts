import { StateCreator } from 'zustand';

export interface appSlice {
  userName: string;
  merchantName: string;
  merchantId: string;
  transactionId: string;
  transactionAmount: number;
  remainingBalance: number;
  updateRemainingBalance: () => void;
  setUserName: (name: string) => void;
  setMerchantName: (name: string) => void;
  setMerchantId: (id: string) => void;
  setTransactionId: (id: string) => void;
  setTransactionAmount: (amount: number) => void;
}

export const createAppSlice: StateCreator<
  appSlice & any,
  [],
  [],
  appSlice
> = (set) => ({
  userName: 'Sanyukta Shrestha',
  merchantName: '',
  merchantId: '',
  transactionId: '',
  transactionAmount: 0,
  remainingBalance: 10000,
  updateRemainingBalance: () =>
    set((state: appSlice) => ({
      remainingBalance: state.remainingBalance - state.transactionAmount,
    })),
  setUserName: (name) =>
    set(() => ({
      userName: name,
    })),
  setMerchantName: (name) =>
    set(() => ({
      merchantName: name,
    })),
  setMerchantId: (id) =>
    set(() => ({
      merchantId: id,
    })),
  setTransactionId: (id) =>
    set(() => ({
      transactionId: id,
    })),
  setTransactionAmount: (amount) =>
    set(() => ({
      transactionAmount: amount,
    })),
});
