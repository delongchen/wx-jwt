import { Context } from 'koa'

function parseJSON(str: string) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return null
  }
}

function parsePostData<T>(ctx: Context) {
  return new Promise<T>((resolve, reject) => {
    let data = ''
    ctx.req.addListener('data', chunk => {
      data += chunk
    })
    ctx.req.addListener('end', () => {
      const result = parseJSON(data)
      if (result) {
        resolve(<T>result)
      } else {
        reject()
      }
    })
  })
}

export {
  parsePostData,
}
