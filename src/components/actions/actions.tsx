import { PropsWithChildren } from 'react'
import './actions.css'

export const Actions = ({ children }: PropsWithChildren) => {
  return <div className="actions react-flow__controls">{children}</div>
}
