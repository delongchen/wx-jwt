interface TokenHeader {
  typ: string //类型
  alg: string //加密方式
}

interface TokenPayload {
  iat: number //签发时间
  exp: number //过期时间
  aud: string //接收者
  iss: string //签发者
  sub: 'admin' | 'user' //面向的用户
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
