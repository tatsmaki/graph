import { Node } from 'reactflow'
import { flowService } from '../services/flow.service'

let id = 0

const getId = () => {
  const { length } = flowService.flow.getNodes()
  id = length
  id += 1
  return String(id)
}

export const createNode = ({ position }: Partial<Node> = {}): Node => {
  if (!position) {
    position = flowService.flow.screenToFlowPosition({
      x: window.innerWidth / 2 - 25,
      y: window.innerHeight / 2 - 25,
    })
  }

  return {
    id: getId(),
    position,
    data: {},
  }
}
