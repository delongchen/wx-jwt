import { Middleware } from 'koa'
import { ResMsg } from "../types/ResMsg";

const AT = 'access-token'
const isHeadersWithToken: Middleware = async (context, next) => {
  const token = context.headers[AT]
  if (typeof token === 'string') {
    context.state.token = token
    await next()
  }
  else {
    context.status = 503
    context.body = ResMsg.NO_TOKEN
  }
}

const setHeaders: (headers: { [key: string]: string }) => Middleware = headers => context => {
  const keys = Reflect.ownKeys(headers)
  for (const key of keys) {
    if (typeof key === 'string')
      context.set(key, headers[key])
  }
}

const setDefHeaders = setHeaders({
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store'
})

const setStaticHeaders = (typ: string = 'application/json') => setHeaders({
  'Content-Type': typ,
  'Cache-Control': 'public, max-age=31536000'
})

export {
  setHeaders,
  setDefHeaders,
  setStaticHeaders,
  isHeadersWithToken
}
