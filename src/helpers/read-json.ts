export const readJson = <T>(file: File): Promise<T> => {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.readAsText(file)
    reader.onload = () => {
      resolve(JSON.parse(reader.result as string))
    }
    reader.onerror = () => {
      reject(reader.error)
    }
  })
}
