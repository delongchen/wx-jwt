import Koa from 'koa'
import appConfig from '../config'
import router from "./router";
import intercept from './middleware/intercept'
const cors = require('@koa/cors')

const app = new Koa

app.use(cors())
  .use(intercept)
  .use(router.routes())
  .use(router.allowedMethods())

function startHttpServer() {
  return new Promise<void>(resolve => {
    app.listen(appConfig.http.port, resolve)
  })
}

export {
  app,
  startHttpServer
}
