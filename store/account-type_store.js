import create from 'zustand'

export const useAccountType = create((set) => ({
  accountType: (null),
  setAccountType: (accountType) => set({ accountType }),
}))