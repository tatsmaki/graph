import { AddNodeProps } from './add-node.types'
import './add-node.css'

export const AddNode = ({ onClick }: AddNodeProps) => {
  return (
    <button className="add-node" onClick={onClick}>
      <span>+</span> Add Node
    </button>
  )
}
