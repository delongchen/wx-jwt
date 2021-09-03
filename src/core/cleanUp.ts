type CleanUpCallBack = () => void

const q: CleanUpCallBack[] = []
const useCleanUp = (cb: CleanUpCallBack): void => void q.push(cb)
const cleanUp = () => { for (const cb of q) cb() }

export {
  useCleanUp,
  cleanUp
}
