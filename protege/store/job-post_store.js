/* eslint-disable import/prefer-default-export */
import create from 'zustand'

export const useForm = create((set) => ({
  form: {},
  tier: undefined,
  setForm: (form) => set({ form }),
  setTier: (tier) => set({ tier }),
}))
