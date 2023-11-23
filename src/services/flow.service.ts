import { ReactFlowInstance } from 'reactflow'

class FlowService {
  flow!: ReactFlowInstance

  setInstance(instance: ReactFlowInstance) {
    this.flow = instance
  }
}

export const flowService = new FlowService()
