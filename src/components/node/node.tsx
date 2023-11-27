import { Handle, NodeProps, Position } from 'reactflow'
import { useHighlightStore } from '../../services/highlight.service'
import './node.css'

export const Node = ({ id }: NodeProps) => {
  const { nodeIds, grayIds, blackIds } = useHighlightStore()

  return (
    <>
      <Handle type="target" position={Position.Top} isConnectable />
      <div
        className={`node ${nodeIds.includes(id) && '--search'} ${
          grayIds.includes(id) && '--gray'
        } ${blackIds.includes(id) && '--black'}`}
      >
        <span>{id}</span>
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable />
    </>
  )
}
