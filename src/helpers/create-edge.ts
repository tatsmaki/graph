import { Edge, EdgeMarker, MarkerType } from 'reactflow'
import { v4 } from 'uuid'
import { useDirectionStore } from '../services/direction.service'

export const createEdge = ({ source, target }: Partial<Edge>): Edge => {
  const { direction } = useDirectionStore.getState()
  const markerEnd: EdgeMarker = {
    type: MarkerType.ArrowClosed,
  }
  const label = `${source} - ${target}`

  return {
    id: v4(),
    source: source || '',
    target: target || '',
    markerEnd: direction ? markerEnd : undefined,
    label,
    type: 'default',
  }
}
