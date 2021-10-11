import {Middleware} from "koa";
import {doCheck} from "./checkAT";
import {ResMsg, ResStatus} from "../../types/ResMsg";
import {Token} from "../../../types/Token";
import { query } from "../../../mysql";
import { parsePostData } from "../../util";
import DelReq from "../../types/DelReq";

const { SUCCESS, UNKNOWN_ERR, PERMISSION_DENIED } = ResMsg

async function doDelete(token: Token, req: DelReq): Promise<ResMsg> {
  if (token.payload.sub === 'admin') {
    const {err} = await query(`delete from av_user where id=?`, req.ids)
    return err ? UNKNOWN_ERR(err.message) : SUCCESS
  }
  return PERMISSION_DENIED
}

const deleteUser: Middleware = async (context, next) => {
  const msg = await doCheck(context.state.token)
  if (msg.status === ResStatus.SUCCESS) {
    const req = await parsePostData<DelReq>(context)
    context.body = await doDelete(<Token>msg.data, req)
  } else {
    context.body = msg
  }
}

export default deleteUser
