/* eslint-disable import/prefer-default-export */
import create from 'zustand'

export const useUi = create((set) => ({
  isNavOpen: false,
  setIsNavOpen: (isNavOpen) => set({ isNavOpen }),
}))
