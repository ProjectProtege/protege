import create from 'zustand'

export const useProfileInfo = create((set) => ({
  profileInfo: null,
  setProfileInfo: (profileInfo) => set({ profileInfo }),
}))
