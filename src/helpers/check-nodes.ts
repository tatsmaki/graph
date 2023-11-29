import { getOutgoers, Node, Edge } from 'reactflow'
import { flowService } from '../services/flow.service'
import { useHighlightStore } from '../services/highlight.service'
import { wait } from './wait'
import { usePathStore } from '../services/path.service'

let routeIntersections = 0

const findNextNode = async (node: Node, nodes: Node[], edges: Edge[]) => {
  const highlightStore = useHighlightStore.getState()
  const pathStore = usePathStore.getState()
  pathStore.addNode(node.id)
  highlightStore.setBlueId(node.id)

  /**
   * Loop detection
   */
  if (highlightStore.grayIds.includes(node.id)) {
    console.warn(node.id, pathStore.path)
    pathStore.addLoop()
    pathStore.resetPath()
    if (highlightStore.blueIds.length > nodes.length) {
      return
    }
    highlightStore.resetGrayAndBlack()
    routeIntersections += 1
    return
  }
  highlightStore.setGrayId(node.id)
  await wait()

  const outgoers = getOutgoers(node, nodes, edges)
  if (outgoers.length) {
    highlightStore.setBlackId(node.id)
    await wait()
  }

  /**
   * Handle chain end
   */
  if (!outgoers.length) {
    highlightStore.resetGrayAndBlack()
    pathStore.resetPath()
    return
  }

  /**
   * Handle branches
   */
  for (let i = 0; i < outgoers.length; i += 1) {
    const outgoer = outgoers[i]

    await wait()
    await findNextNode(outgoer, nodes, edges)
  }
}

const findFirstNode = (nodes: Node[]) => {
  const highlightStore = useHighlightStore.getState()

  return nodes.find((node) => !highlightStore.blueIds.includes(node.id)) || nodes[0]
}

export const checkNodes = async () => {
  routeIntersections = 0
  const edges = flowService.flow.getEdges()
  const nodes = flowService.flow.getNodes()
  usePathStore.getState().resetLoops()

  let groups = 0
  while (nodes.length > useHighlightStore.getState().blueIds.length) {
    groups += 1
    await findNextNode(findFirstNode(nodes), nodes, edges)
  }

  const { loops } = usePathStore.getState()

  return {
    nodes: nodes.length,
    loops: loops.length,
    isCyclical: !!loops.length,
    groups,
    isCoherent: groups === 1,
    routeIntersections,
  }
}
