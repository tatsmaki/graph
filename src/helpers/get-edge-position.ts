import { Node, Position, XYPosition } from 'reactflow'

export function getEdgePosition(node: Node, intersectionPoint: XYPosition) {
  const x = node.positionAbsolute?.x || 0
  const y = node.positionAbsolute?.y || 0
  const width = node.width || 0
  const height = node.height || 0
  const nx = Math.round(x)
  const ny = Math.round(y)
  const px = Math.round(intersectionPoint.x)
  const py = Math.round(intersectionPoint.y)

  if (px <= nx + 1) {
    return Position.Left
  }
  if (px >= nx + width - 1) {
    return Position.Right
  }
  if (py <= ny + 1) {
    return Position.Top
  }
  if (py >= y + height - 1) {
    return Position.Bottom
  }

  return Position.Top
}
