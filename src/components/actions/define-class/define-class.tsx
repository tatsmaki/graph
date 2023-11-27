import { checkEdges } from '../../../helpers/check-edges'
import { checkNodes } from '../../../helpers/check-nodes'

export const DefineClass = () => {
  const handleDefine = async () => {
    const { edges, isDirectional } = checkEdges()
    const { nodes, loops } = await checkNodes()
    console.log(nodes, edges, isDirectional, loops)

    if (isDirectional) {
      console.warn('Ориентированный')

      if (nodes === edges + 1) {
        console.warn('Ациклический, Дерево')
      }
    } else {
      console.warn('Неориентированный')

      if (nodes === edges) {
        console.warn('Циклический')
      }
    }
  }

  return <button onClick={handleDefine}>Define Class</button>
}
