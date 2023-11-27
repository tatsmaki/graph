export const wait = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, 300)
  })
}
