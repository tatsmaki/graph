import { checkEdges } from '../../../helpers/check-edges'
import { checkNodes } from '../../../helpers/check-nodes'
import { useHighlightStore } from '../../../services/highlight.service'

export const DefineClass = () => {
  const handleDefine = async () => {
    useHighlightStore.getState().resetAll()
    const { edges, isDirectional, isNotDirectional } = checkEdges()
    const { nodes, loops, isCyclical, groups, isCoherent } = await checkNodes()

    let description: string[] = []

    if (isCoherent) {
      description.push('Связный')
    }

    if (isDirectional) {
      description.push('Ориентированный')

      if (isCyclical) {
        description.push('Циклический')
      }

      if (nodes === edges + 1 && isCoherent) {
        description.push('Дерево')
      }
    }

    if (isNotDirectional) {
      description.push('Неориентированный')

      if (nodes === edges) {
        description.push('Полный')
      }
    }

    alert(`
      Характеристики

      Узлов: ${nodes}
      Рёбер: ${edges}
      Циклов: ${loops}
      Подграфов: ${groups}

      Классификация

      ${description.join(', ')}
    `)
  }

  return <button onClick={handleDefine}>Define Class</button>
}
