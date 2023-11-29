import { useCallback, useState } from 'react'
import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  OnInit,
} from 'reactflow'
import 'reactflow/dist/style.css'
import './flow.css'
import { AddNode } from '../actions/add-node'
import { useConnect } from '../../hooks/use-connect'
import { EdgeLine } from '../edge-line/edge-line'
import { Edge as EdgeComponent } from '../edge'
import { Node as NodeComponent } from '../node'
import { createNode } from '../../helpers/create-node'
import { flowService } from '../../services/flow.service'
import { Actions } from '../actions'
import { Export } from '../actions/export'
import { Import } from '../actions/import'
import { EdgeDirection } from '../actions/edge-direction'
import { DefineClass } from '../actions/define-class'
import { Matrix } from '../matrix'

const nodeTypes = {
  default: NodeComponent,
}

const edgeTypes = {
  default: EdgeComponent,
}

export const Flow = () => {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const { onConnectStart, onConnectEnd } = useConnect(setNodes, setEdges)

  const onInit: OnInit = useCallback((instance) => {
    flowService.setInstance(instance)
  }, [])

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds))
  }, [])

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds))
  }, [])

  const onNodeAdd = useCallback(() => {
    const newNode = createNode()
    flowService.flow.addNodes(newNode)
  }, [])

  return (
    <div className="flow">
      <Actions>
        <AddNode onClick={onNodeAdd} />
        <EdgeDirection />
        <Export />
        <Import />
        <DefineClass />
      </Actions>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineComponent={EdgeLine}
        onInit={onInit}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
      >
        <Background variant={BackgroundVariant.Lines} />
        <Controls position="top-right" />
      </ReactFlow>
      <Matrix nodes={nodes} edges={edges} />
    </div>
  )
}
