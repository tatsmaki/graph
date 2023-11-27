import { create } from 'zustand'

interface IHighlightStore {
  edgeId: string
  nodeIds: string[]
  grayIds: string[]
  blackIds: string[]
  setHighlight(edgeId: string, nodeIds: string[]): void
  setGrayId(nodeId: string): void
  setBlackId(nodeId: string): void
  resetHighlight(): void
}

export const useHighlightStore = create<IHighlightStore>((set) => ({
  edgeId: '',
  nodeIds: [],
  grayIds: [],
  blackIds: [],
  setHighlight(edgeId, nodeIds) {
    set({ edgeId, nodeIds })
  },
  setGrayId(nodeId) {
    set((state) => ({ grayIds: [...state.grayIds, nodeId] }))
  },
  setBlackId(nodeId) {
    set((state) => ({ blackIds: [...state.blackIds, nodeId] }))
  },
  resetHighlight() {
    set({ grayIds: [], blackIds: [] })
  },
}))
