import { useDirectionStore } from '../../../services/direction.service'
import './edge-direction.css'

export const EdgeDirection = () => {
  const { direction, toggleDirection } = useDirectionStore()

  const handleDirection = () => {
    toggleDirection()
  }

  return (
    <label className="edge-direction">
      <input type="checkbox" checked={direction} onChange={handleDirection} />
      Edge Direction
    </label>
  )
}
