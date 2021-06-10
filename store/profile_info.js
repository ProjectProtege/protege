import create from 'zustand'

export const useProfileInfo = create((set) => ({
  profileInfo: null,
  postedJobs: null,
  requiredCompanyProfileFields: [
    'displayName',
    'email',
    'companyWebsite',
    'companyEmail',
    'companyHQ',
    'companyTimezone',
    'companyTimeframeFrom',
    'companyTimeframeTo',
    'companyDescription',
    'avatar',
  ],
  setProfileInfo: (profileInfo) => {
    return set({ profileInfo })
  },
  setPostedJobs: (postedJobs) => {
    return set({ postedJobs })
  },
}))
