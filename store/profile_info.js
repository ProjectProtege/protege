import create from 'zustand'

export const useProfileInfo = create((set) => ({
  profileInfo: null,
  setProfileInfo: (profileInfo) => {
    console.log('settingProfileInfo', profileInfo)
    return set({ profileInfo })
  },
}))
