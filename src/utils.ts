import {createHash} from "crypto";

function getSHA256Of(s: string | undefined) {
  if (s === undefined) return ''
  const hashMaker = createHash('sha256')
  const hash = hashMaker.update(s)
  return hash.digest('hex')
}

export {
  getSHA256Of
}
