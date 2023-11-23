import { Dispatch, SetStateAction, useCallback, useRef } from 'react'
import { Edge, Node, OnConnectEnd, OnConnectStart, XYPosition, addEdge } from 'reactflow'
import { createEdge } from '../helpers/create-edge'
import { createNode } from '../helpers/create-node'
import { flowService } from '../services/flow.service'

export const useConnect = (
  setNodes: Dispatch<SetStateAction<Node[]>>,
  setEdges: Dispatch<SetStateAction<Edge[]>>
) => {
  const sourceRef = useRef('')

  const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
    sourceRef.current = nodeId || ''
  }, [])

  const createNewNodeAndConnect = useCallback((position: XYPosition) => {
    const newNode = createNode({ position })
    const target = newNode.id
    const newEdge = createEdge({ source: sourceRef.current, target })
    setNodes((nds) => [...nds, newNode])
    setEdges((eds) => [...eds, newEdge])
  }, [])

  const onConnectEnd: OnConnectEnd = useCallback((event) => {
    if (!sourceRef.current) {
      return
    }

    // @ts-ignore
    const isPane = event.target?.classList.contains('react-flow__pane')
    if (isPane) {
      if (event instanceof MouseEvent) {
        const position = flowService.flow.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        })
        createNewNodeAndConnect(position)
      }
      return
    }

    // @ts-ignore
    const isNode = event.target?.classList.contains('react-flow__node')
    if (isNode) {
      // @ts-ignore
      const target = event.target.dataset.id
      const newEdge = createEdge({ source: sourceRef.current, target })
      setEdges((eds) => addEdge(newEdge, eds))
      return
    }

    // @ts-ignore
    const isHandle = event.target?.classList.contains('react-flow__handle')
    if (isHandle) {
      // @ts-ignore
      const target = event.target.dataset.nodeid
      const newEdge = createEdge({ source: sourceRef.current, target })
      setEdges((eds) => addEdge(newEdge, eds))
    }
  }, [])

  return {
    onConnectStart,
    onConnectEnd,
  }
}
