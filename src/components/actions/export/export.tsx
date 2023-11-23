import { flowService } from '../../../services/flow.service'

export const Export = () => {
  const handleExport = () => {
    const json = flowService.flow.toObject()
    const file = 'data:text/json;charset=utf-8,' + JSON.stringify(json, null, 4)
    const link = document.createElement('a')

    link.href = file
    link.download = 'graph.json'
    link.click()
  }

  return (
    <button className="export" onClick={handleExport}>
      Export
    </button>
  )
}
