import {Middleware} from "koa";
import {parsePostData} from "../../util";
import LoginReq from "../../types/LoginReq";
import isUserNameExist from "./checkUserName";
import {ResMsg, ResStatus} from "../../types/ResMsg";
import { getSHA256Of } from "../../../utils";
import { query } from "../../../mysql";
import {sign} from "../../../core/tokens";

async function doRegister(req: LoginReq): Promise<ResMsg> {
  const {psw, userName} = req
  const [msg, user] = await isUserNameExist(userName)
  if (msg.status !== ResStatus.NO_USER) return msg

  await query('insert into av_user set ?', {id: userName, psw: getSHA256Of(psw)})

  return {
    status: ResStatus.SUCCESS,
    msg: 'successes',
    token: sign(user)
  }
}

const register: Middleware = async (context, next) => {
  context.body = await doRegister(await parsePostData<LoginReq>(context))
  await next()
}

export default register
