import { Middleware } from 'koa'
import {tokenToToken} from "../../../core/tokens";
import { ResMsg } from "../../types/ResMsg";
import {Token} from "../../../types/Token";

const { SUCCESS, TOKEN_EXPIRE, ILLEGAL_TOKEN } = ResMsg

const doCheck = (accessToken: string): ResMsg => {
  const token = tokenToToken(accessToken)
  if (token) {
    const { iat, exp } = token.payload
    return (Date.now() - iat < exp) ? SUCCESS : TOKEN_EXPIRE
  }
  return ILLEGAL_TOKEN
}

const checkAT: Middleware = async (context, next) => {
  const accessToken = <string>context.state.token
  context.body = doCheck(accessToken)
  await next()
}

export default checkAT
