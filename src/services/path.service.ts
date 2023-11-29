import { create } from 'zustand'

interface IPathStore {
  path: string[]
  loops: string[][]
  addNode(nodeId: string): void
  resetPath(): void
  addLoop(): void
  resetLoops(): void
}

export const usePathStore = create<IPathStore>((set) => ({
  path: [],
  loops: [],
  addNode(nodeId) {
    set((state) => ({ path: [...state.path, nodeId] }))
  },
  resetPath() {
    set({ path: [] })
  },
  addLoop() {
    set((state) => ({ loops: [...state.loops, state.path] }))
  },
  resetLoops() {
    set({ path: [], loops: [] })
  },
}))
