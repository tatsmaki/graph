import { Node, XYPosition } from 'reactflow'

export const getNodeIntersection = (sourceNode: Node, targetNode: Node): XYPosition => {
  const sourceNodeWidth = sourceNode.width!
  const sourceNodeHeight = sourceNode.height!
  const sourceNodePosition = sourceNode.positionAbsolute!
  const targetNodeWidth = targetNode.width!
  const targetNodeHeight = targetNode.height!
  const targetNodePosition = targetNode.positionAbsolute!

  const w = sourceNodeWidth / 2
  const h = sourceNodeHeight / 2

  const x2 = sourceNodePosition.x + w
  const y2 = sourceNodePosition.y + h
  const x1 = targetNodePosition.x + targetNodeWidth / 2
  const y1 = targetNodePosition.y + targetNodeHeight / 2

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h)
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h)
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1))
  const xx3 = a * xx1
  const yy3 = a * yy1
  const x = w * (xx3 + yy3) + x2
  const y = h * (-xx3 + yy3) + y2

  return { x, y }
}
