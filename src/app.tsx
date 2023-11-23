import { ReactFlowProvider } from 'reactflow'
import { Flow } from './components/flow'

export const App = () => {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  )
}
