import {Middleware} from "koa";
import { createLogger } from "bunyan";

const logger = createLogger({
  stream: process.stdout,
  name: 'req'
})

const intercept: Middleware = async (context, next) => {
  const { url } = context.req
  logger.info({ url })
  await next()
}

export default intercept
