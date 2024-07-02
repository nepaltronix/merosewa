// store/useStore.ts
import { create } from 'zustand';
import { createAppSlice, appSlice } from './appSlice';

const useAppStore = create<appSlice>()((...a) => ({
   ...createAppSlice(...a) 
}))

export default useAppStore;
