import {Middleware} from 'koa'
import {parsePostData} from '../../util'
import {getSHA256Of} from "../../../utils";
import type LoginReq from '../../types/LoginReq'
import {ResMsg, ResStatus} from '../../types/ResMsg'
import {sign} from "../../../core/tokens";
import isUserNameExist from "./checkUserName";

const checkLogin = async (req: LoginReq): Promise<ResMsg> => {
  const { PSW_ERR } = ResMsg
  const { userName, psw } = req
  const [msg, user] = await isUserNameExist(userName)
  if (msg.status !== ResStatus.USER_EXIST) return msg
  else {
    const pswHash = getSHA256Of(psw)
    if (pswHash !== user?.psw) return PSW_ERR
    else return {
      status: ResStatus.SUCCESS,
      msg: 'successes',
      token: sign(user)
    }
  }
}

const login: Middleware = async (context, next) => {
  context.body = await checkLogin(await parsePostData<LoginReq>(context))
  await next()
}

export default login
