import { StateCreator } from 'zustand';

export interface appSlice {
  userName: string;
  merchantName: string;
  merchantId: string;
  transactionID: string;
  transcationAmount: number;
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
  transactionID: '',
  transcationAmount: 0,
  remainingBalance: 10000,
  updateRemainingBalance: () =>
    set((state: appSlice) => ({
      remainingBalance: state.remainingBalance - state.transcationAmount,
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
      transactionID: id,
    })),
  setTransactionAmount: (amount) =>
    set(() => ({
      transcationAmount: amount,
    })),
});
