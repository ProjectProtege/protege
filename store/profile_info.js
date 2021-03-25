import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useProfileInfo = create((set) => ({
  profileInfo: null,
  setProfileInfo: (profileInfo) => set({ profileInfo }),
}))
