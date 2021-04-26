import create from 'zustand'

export const useProfileInfo = create((set) => ({
  profileInfo: null,
  postedJobs: null,
  setProfileInfo: (profileInfo) => {
    return set({ profileInfo })
  },
  setPostedJobs: (postedJobs) => {
    return set({ postedJobs })
  },
}))
