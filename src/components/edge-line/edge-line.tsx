import { ConnectionLineComponentProps, getStraightPath } from 'reactflow'
import { getEdgeParams } from '../../helpers/get-edge-params'

export const EdgeLine = ({ toX, toY, fromNode }: ConnectionLineComponentProps) => {
  if (!fromNode) {
    return null
  }

  const targetNode = {
    id: '0',
    width: 1,
    height: 1,
    positionAbsolute: { x: toX, y: toY },
    data: {},
    position: { x: toX, y: toY },
  }

  const { sourceX, sourceY } = getEdgeParams(fromNode, targetNode)
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX: toX,
    targetY: toY,
  })

  return (
    <g>
      <path fill="none" stroke="#222" strokeWidth={1.5} className="animated" d={edgePath} />
      <circle cx={toX} cy={toY} fill="#fff" r={3} stroke="#222" strokeWidth={1.5} />
    </g>
  )
}
