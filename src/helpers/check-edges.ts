import { flowService } from '../services/flow.service'

export const checkEdges = () => {
  const edges = flowService.flow.getEdges()
  const isDirectional = edges.every((edge) => edge.markerEnd)
  const isNotDirectional = edges.every((edge) => !edge.markerEnd)

  return {
    edges: edges.length,
    isDirectional,
    isNotDirectional,
  }
}
