import { EdgeProps, EdgeLabelRenderer, getStraightPath } from 'reactflow'
import { flowService } from '../../services/flow.service'
import { getEdgeParams } from '../../helpers/get-edge-params'
import { useHighlightStore } from '../../services/highlight.service'
import './edge.css'

export const Edge = ({ id, source, target, markerEnd, style, label }: EdgeProps) => {
  const { edgeId } = useHighlightStore()
  const sourceNode = flowService.flow.getNode(source)
  const targetNode = flowService.flow.getNode(target)

  if (!sourceNode || !targetNode) {
    return
  }

  const { sourceX, sourceY, targetX, targetY } = getEdgeParams(sourceNode, targetNode)
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  })

  return (
    <>
      <path
        id={id}
        className={`react-flow__edge-path ${edgeId === id && '--search'}`}
        d={edgePath}
        markerEnd={markerEnd}
        style={style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            background: 'white',
            pointerEvents: 'all',
            cursor: 'pointer',
          }}
          className="nodrag nopan"
        >
          {String(label).replace('-', markerEnd ? '→' : '-')}
        </div>
      </EdgeLabelRenderer>
    </>
  )
}
