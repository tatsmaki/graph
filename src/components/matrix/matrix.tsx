import { useLayoutEffect, useMemo, useRef } from 'react'
import { MatrixProps } from './matrix.types'
import './matrix.css'
import { getOutgoers, getConnectedEdges } from 'reactflow'

export const Matrix = ({ nodes, edges }: MatrixProps) => {
  const gridRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    gridRef.current?.style.setProperty('--grid-columns', String(nodes.length + 1))
  }, [nodes])

  const { sortedNodes, matrix } = useMemo(() => {
    const sortedNodes = [...nodes].sort((a, b) => +a.id - +b.id)

    const matrix = sortedNodes.reduce<number[]>((acc, cur) => {
      const outgoers = getOutgoers(cur, nodes, edges)

      const connected = getConnectedEdges([cur], edges)

      const row = sortedNodes.map((node) => {
        const directMatch = outgoers.find(({ id }) => id === node.id)
        const edgeWithoutDirectionMatch = connected.find(({ source, target, markerEnd }) => {
          return !markerEnd && source === node.id && target === cur.id
        })
        const match = directMatch || edgeWithoutDirectionMatch

        return Number(!!match)
      })
      acc.push(...row)
      return acc
    }, [])

    return { sortedNodes, matrix }
  }, [nodes])

  return (
    <div className="matrix" ref={gridRef}>
      <div className="matrix-label" style={{ gridColumn: 1, gridRow: 1 }} />
      {sortedNodes.map((node, index) => (
        <div key={node.id} className="matrix-label" style={{ gridColumn: index + 2, gridRow: 1 }}>
          {node.id}
        </div>
      ))}
      {sortedNodes.map((node, index) => (
        <div key={node.id} className="matrix-label" style={{ gridColumn: 1, gridRow: index + 2 }}>
          {node.id}
        </div>
      ))}
      {matrix.map((number, index) => (
        <div className="matrix-cell" key={index} style={{ color: number ? 'black' : '#eee' }}>
          {number}
        </div>
      ))}
    </div>
  )
}
