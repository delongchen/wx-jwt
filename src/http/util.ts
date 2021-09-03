import { Context } from 'koa'

function parsePostData<T>(ctx: Context): Promise<T> {
  return new Promise<T>(resolve => {
    let data = ''
    ctx.req.addListener('data', chunk => {
      data += chunk
    })
    ctx.req.addListener('end', () => {
      resolve(JSON.parse(data) as T)
    })
  })
}

export {
  parsePostData,
}
