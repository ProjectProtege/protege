import create from 'zustand'

export const useEditJob = create((set) => ({
  editJob: {},
  setEditJob: (editJob) => set({ editJob }),
}))
