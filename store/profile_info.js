import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useProfileInfo = create(
  persist(
    (set, get) => ({
      profileInfo: null,
      setProfileInfo: (profileInfo) => set({ profileInfo }),
      action: () => {
        const profileInfo = get().profileInfo
      },
    }),
    {
      name: 'profile-info',
    }
  )
)
