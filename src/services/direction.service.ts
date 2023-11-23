import { create } from 'zustand'

interface IDirectionStore {
  direction: boolean
  toggleDirection(): void
}

export const useDirectionStore = create<IDirectionStore>((set) => ({
  direction: true,
  toggleDirection() {
    set((state) => ({ direction: !state.direction }))
  },
}))
