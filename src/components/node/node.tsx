import { Handle, NodeProps, Position } from 'reactflow'
import { useHighlightStore } from '../../services/highlight.service'
import './node.css'

export const Node = ({ id }: NodeProps) => {
  const { blueIds, grayIds, blackIds } = useHighlightStore()
  const isBlue = blueIds.includes(id)
  const isGray = grayIds.includes(id)
  const isBlack = blackIds.includes(id)

  return (
    <>
      <Handle type="target" position={Position.Top} isConnectable />
      <div className={`node ${isBlue && '--blue'} ${isGray && '--gray'} ${isBlack && '--black'}`}>
        <span>{id}</span>
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable />
    </>
  )
}
