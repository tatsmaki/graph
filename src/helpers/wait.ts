import { flowService } from '../services/flow.service'

export const wait = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, 5000 / flowService.flow.getNodes().length)
  })
}
