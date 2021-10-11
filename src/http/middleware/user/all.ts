import { Middleware } from "koa";
import { doCheck } from "./checkAT";
import {ResStatus, ResMsg} from "../../types/ResMsg";
import { select } from "../../../mysql";
import {Token} from "../../../types/Token";
import AvUser from "../../types/AvUser";

const { PERMISSION_DENIED, UNKNOWN_ERR, SUCCESS } = ResMsg

async function getDataByToken(token: Token | undefined): Promise<ResMsg> {
  if (!token) return UNKNOWN_ERR('emmm i dont know')
  if (token.payload.sub === 'admin') {
    return { ...SUCCESS, data: (await select<AvUser>({ fields: ['id'] })).results}
  } else return PERMISSION_DENIED
}

const getAllUsers: Middleware = async (context, next) => {
  const msg = await doCheck(<string>context.state.token)
  if (msg.status !== ResStatus.SUCCESS) {
    context.body = msg
    return
  }
  context.body = await getDataByToken(msg.data)
  await next()
}

export default getAllUsers
