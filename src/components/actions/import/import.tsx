import { ChangeEventHandler } from 'react'
import { flowService } from '../../../services/flow.service'
import './import.css'
import { readJson } from '../../../helpers/read-json'
import { ReactFlowJsonObject } from 'reactflow'
import { useHighlightStore } from '../../../services/highlight.service'

export const Import = () => {
  const handleImport: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files } = event.target
    flowService.flow.setNodes([])
    flowService.flow.setEdges([])

    if (files) {
      useHighlightStore.getState().resetAll()

      readJson<ReactFlowJsonObject>(files[0]).then((json) => {
        flowService.flow.setViewport(json.viewport)
        flowService.flow.setNodes(json.nodes)
        flowService.flow.setEdges(json.edges)
        event.target.value = ''
      })
    }
  }

  return (
    <label role="button" className="import">
      Import
      <input type="file" onChange={handleImport} />
    </label>
  )
}
