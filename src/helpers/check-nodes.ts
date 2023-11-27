import { getOutgoers, Node, Edge } from 'reactflow'
import { flowService } from '../services/flow.service'
import { useHighlightStore } from '../services/highlight.service'
import { wait } from './wait'

const findNextNode = async (node: Node, nodes: Node[], edges: Edge[]) => {
  const highlightService = useHighlightStore.getState()

  if (highlightService.grayIds.includes(node.id)) {
    console.warn('Петля')
  }
  const outgoers = getOutgoers(node, nodes, edges)
  if (outgoers.length) {
    highlightService.setBlackId(node.id)
    await wait()
  }

  for (let i = 0; i < outgoers.length; i += 1) {
    const outgoer = outgoers[i]
    highlightService.setGrayId(outgoer.id)
    await wait()
    await findNextNode(outgoer, nodes, edges)
  }
}

export const checkNodes = async () => {
  const edges = flowService.flow.getEdges()
  const nodes = flowService.flow.getNodes()
  const loops: string[][] = []
  // const path = new Set<string>()

  //   const outgoers = getOutgoers(nodes[0], nodes, edges)
  //   const connectedEdges = getConnectedEdges([nodes[0]], edges)
  //   console.log(nodes[0], outgoers, connectedEdges)

  // const highlightService = useHighlightStore.getState()

  await findNextNode(nodes[0], nodes, edges)

  //   for (let i = 0; i < nodes.length; i += 1) {
  //     const node = nodes[i]

  //     highlightService.setBlackId(node.id)
  //     const outgoers = getOutgoers(node, nodes, edges)
  //     const connectedEdges = getConnectedEdges([node], edges).filter(
  //       (edge) => edge.source === node.id
  //     )

  //     for (let j = 0; j < connectedEdges.length; j += 1) {
  //       //   const edge = connectedEdges[j]
  //       //   useHighlightStore.getState().setHighlight(edge.id, [edge.source, edge.target])
  //       //   await wait(() => {
  //       //     useHighlightStore.getState().setHighlight('', [])
  //       //   })
  //     }
  //   }

  //   for (let i = 0; i < edges.length; i += 1) {
  //     const edge = edges[i]
  //     path.add(edge.source)
  //     if (path.has(edge.target)) {
  //       loops.push([...path])
  //       path.clear()
  //     }

  //     useHighlightStore.getState().setHighlight(edge.id, [edge.source, edge.target])

  //     await wait(() => {
  //       useHighlightStore.getState().setHighlight('', [])
  //     })
  //   }

  return {
    nodes: nodes.length,
    loops,
  }
}
