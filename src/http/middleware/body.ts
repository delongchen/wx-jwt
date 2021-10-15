import {Middleware} from "koa";
import { parsePostData } from '../util'
import {ResMsg} from "../types/ResMsg";

const parseBody: Middleware = async (context, next) => {
  const body = await parsePostData(context).catch(() => null)

  if (body) {
    context.state.body = body
    await next()
  } else {
    context.body = ResMsg.ILLEGAL_BODY
    context.status = 502
  }
}

export {
  parseBody
}
