interface TokenHeader {
  typ: string //类型
  alg: string //加密方式
}

interface TokenPayload {
  iat: number //签发时间
  exp: number //过期时间
  iss?: string //签发者
  sub?: string //面向的用户
  aud?: string //接收者
}

interface Token {
  header: TokenHeader
  payload: TokenPayload
  signature: string
}

export {
  Token,
  TokenPayload,
  TokenHeader
}
