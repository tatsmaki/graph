import { Handle, NodeProps, Position } from 'reactflow'
import './node.css'

export const Node = ({ id }: NodeProps) => {
  return (
    <>
      <Handle type="target" position={Position.Top} isConnectable />
      <div className="node">
        <span>{id}</span>
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable />
    </>
  )
}
