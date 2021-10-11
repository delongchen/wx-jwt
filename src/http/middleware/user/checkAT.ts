import {Middleware} from 'koa'
import {tokenToToken} from "../../../core/tokens";
import {ResMsg, ResStatus} from "../../types/ResMsg";
import isUserNameExist from "./checkUserName";

const { SUCCESS, TOKEN_EXPIRE, ILLEGAL_TOKEN } = ResMsg

const doCheck = async (accessToken: string): Promise<ResMsg> => {
  const token = tokenToToken(accessToken)
  if (token) {
    const { iat, exp, aud } = token.payload
    const [ msg ] = await isUserNameExist(aud)
    if (msg.status === ResStatus.USER_EXIST)
      return (Date.now() - iat < exp) ? {...SUCCESS, data: token} : TOKEN_EXPIRE
  }
  return ILLEGAL_TOKEN
}

const checkAT: Middleware = async (context, next) => {
  const accessToken = <string>context.state.token
  context.body = await doCheck(accessToken)
  await next()
}

export {
  checkAT,
  doCheck
}
