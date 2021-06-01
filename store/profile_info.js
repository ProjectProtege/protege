import create from 'zustand'

export const useProfileInfo = create((set) => ({
  profileInfo: null,
  postedJobs: null,
  requiredCompanyProfileFields: [
    'displayName',
    'accountType',
    'slug',
    'email',
    'userUid',
    'companyWebsite',
    'companyEmail',
    'companyHQ',
    'companyTimezone',
    'companyTimeframeFrom',
    'companyTimeframeTo',
    'companyDescription',
    'companyLogo',
  ],
  setProfileInfo: (profileInfo) => {
    return set({ profileInfo })
  },
  setPostedJobs: (postedJobs) => {
    return set({ postedJobs })
  },
}))
