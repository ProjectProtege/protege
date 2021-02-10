/* eslint-disable import/prefer-default-export */
import create from 'zustand'

export const useJobForm = create((set) => ({
  status: 1,
  form: {
    approved: false,
    status: 'active',
    companyEmail: '',
    companyLogo: '',
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
  companyLogoFile: {},
  tier: 1,
  setStatus: (status) => set({ status }),
  setForm: (form) => set({ form }),
  setTier: (tier) => set({ tier }),
  setCompanyLogoFile: (companyLogoFile) => set({ companyLogoFile }),
}))
