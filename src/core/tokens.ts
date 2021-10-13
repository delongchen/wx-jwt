import {Token, TokenHeader, TokenPayload} from "../types/Token";
import { getSHA256Of } from "../utils";
import { encrypt, decrypt } from "./rsa";
import appConfig from "../config";
import AvUser from "../http/types/AvUser";

const bs64 = (s: object | string) => {
  return Buffer.from((typeof s === 'string') ? s : JSON.stringify(s)).toString('base64url')
}

const bs64ToJSON = <T>(s: string) => {
  const json = Buffer.from(s, 'base64url').toString()
  return <T>JSON.parse(json)
}

const { app: { admin } } = appConfig
const adminSet = new Set(admin)
const header: TokenHeader = { typ: "JWT", alg: "RS256" }
const headerCache = bs64(header)

const exp = 60 * 60 * 24 * 1000
const iss = '反正不是吴翔'

function userToken(user: AvUser | undefined) {
  const userName = user?.id ?? ''

  const result: TokenPayload = {
    iat: Date.now(),
    iss,
    aud: userName,
    mate: { uuid: 'todo' },
    exp,
    sub: 'user'
  }

  if (adminSet.has(userName)) {
    result.exp = exp * 365
    result.sub = 'admin'
  }

  return result
}

function sign(user: AvUser | undefined) {
  const payloadBase64 = bs64(userToken(user))
  const toCrypto = [headerCache, payloadBase64].join('.')
  const signature = encrypt(getSHA256Of(toCrypto))

  return `${toCrypto}.${signature}`
}

function tokenToToken(token: string): Token | undefined {
  const bodies = token.split('.')
  if (bodies.length === 3) {
    const [h, p, s] = bodies
    if (getSHA256Of(`${h}.${p}`) === decrypt(s)) {
      return {
        header: bs64ToJSON<TokenHeader>(h),
        payload: bs64ToJSON<TokenPayload>(p),
        signature: 'ok'
      }
    }
  }
}

export {
  sign,
  tokenToToken
}
