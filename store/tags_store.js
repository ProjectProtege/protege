import create from 'zustand'

export const useTags = create((set) => ({
  tags: [],
  setTags: (tags) => set({ tags }),
}))
