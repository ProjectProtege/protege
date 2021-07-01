/* eslint-disable import/prefer-default-export */
import create from 'zustand'

export const useJobForm = create((set) => ({
  status: 1,
  form: {
    approved: false,
    status: 'active',
    companyEmail: '',
    avatar: '',
    companyName: '',
    companyWebsite: '',
    companyHQ: '',
    companyDescription: '',
    howToApply: '',
    jobDescription: '',
    jobtitle: '',
    paid: false,
    positionType: '',
    postedAt: '',
    roleFocus: '',
  },
  avatarFile: {},
  tier: 'price_1GuKFPLy9mbkpBNAI6XtSdqT',
  setStatus: (status) => set({ status }),
  setForm: (form) => set({ form }),
  setTier: (tier) => set({ tier }),
  setavatarFile: (avatarFile) => set({ avatarFile }),
}))
