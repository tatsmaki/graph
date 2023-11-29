import { create } from 'zustand'

interface IHighlightStore {
  blueIds: string[]
  grayIds: string[]
  blackIds: string[]
  setBlueId(nodeId: string): void
  setGrayId(nodeId: string): void
  setBlackId(nodeId: string): void
  resetGrayAndBlack(): void
  resetAll(): void
}

export const useHighlightStore = create<IHighlightStore>((set) => ({
  blueIds: [],
  grayIds: [],
  blackIds: [],
  setBlueId(nodeId) {
    set((state) => ({ blueIds: [...state.blueIds, nodeId] }))
  },
  setGrayId(nodeId) {
    set((state) => ({ grayIds: [...state.grayIds, nodeId] }))
  },
  setBlackId(nodeId) {
    set((state) => ({ blackIds: [...state.blackIds, nodeId] }))
  },
  resetGrayAndBlack() {
    set({ grayIds: [], blackIds: [] })
  },
  resetAll() {
    set({ blueIds: [], grayIds: [], blackIds: [] })
  },
}))
