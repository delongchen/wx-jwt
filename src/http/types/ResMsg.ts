enum ResStatus {
  'SUCCESS',
  'NO_USER',
  'PSW_ERR',
  'USER_EXIST',
  'EMPTY_NAME',
  'NO_TOKEN',
  'TOKEN_EXPIRE',
  'ILLEGAL_TOKEN',
  'UNKNOWN_ERR'
}

class ResMsg {
  static STATUS = ResStatus

  status?: ResStatus
  msg?: string
  token?: string

  constructor(status: ResStatus, msg: string) {
    this.status = status
    this.msg = msg
  }

  static createCache(msg: ResMsg) {
    return Buffer.from(JSON.stringify(msg))
  }

  static SUCCESS: ResMsg = { status: ResStatus.SUCCESS, msg: 'successes' }
  static NO_USER: ResMsg = { status: ResStatus.NO_USER, msg: 'not registered' }
  static PSW_ERR: ResMsg = { status: ResStatus.PSW_ERR, msg: 'password error' }
  static USER_EXIST: ResMsg = { status: ResStatus.USER_EXIST, msg: 'user exists' }
  static EMPTY_NAME: ResMsg = { status: ResStatus.EMPTY_NAME, msg: 'username is empty' }
  static NO_TOKEN: ResMsg = { status: ResStatus.NO_TOKEN, msg: 'no access-token' }
  static TOKEN_EXPIRE: ResMsg = { status: ResStatus.TOKEN_EXPIRE, msg: 'access-token expire' }
  static ILLEGAL_TOKEN: ResMsg = { status: ResStatus.ILLEGAL_TOKEN, msg: 'illegal access-token' }

  static UNKNOWN_ERR = (err: string): ResMsg => ({ status: ResStatus.UNKNOWN_ERR, msg: err })
}

export {
  ResMsg,
  ResStatus
}
