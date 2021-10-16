import create from 'zustand'

export const useProfileInfo = create((set) => ({
  profileInfo: null,
  postedJobs: null,
  requiredCompanyProfileFields: [
    'displayName',
    'email',
    'companyWebsite',
    'companyEmail',
    'companyDescription',
    'avatar',
  ],
  requiredCandidateProfileFields: [
    'firstName',
    'lastName',
    'email',
    'portfolio',
    'question1',
    'question2',
    'question3',
  ],
  setProfileInfo: (profileInfo) => {
    return set({ profileInfo })
  },
  setPostedJobs: (postedJobs) => {
    return set({ postedJobs })
  },
}))
