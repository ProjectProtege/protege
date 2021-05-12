/* eslint-disable import/prefer-default-export */
import create from 'zustand'

export const useJobs = create((set) => ({
  jobs: [],
  applicants: [],
  activeCandidate: null,
  setJobs: (jobs) => set({ jobs }),
  setApplicants: (applicants) => set({ applicants }),
  setActiveCandidate: (activeCandidate) => set({ activeCandidate }),
}))
