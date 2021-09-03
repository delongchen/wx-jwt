import { readFileSync, promises } from 'fs'
import appConfig from "../config";
import NodeRSA from "node-rsa";

const { private_pem, public_pem } = appConfig.http
const privatePem = readFileSync(private_pem, 'utf-8')
const publicPem = readFileSync(public_pem, 'utf-8')
const privateKey = new NodeRSA(privatePem)
const publicKey = new NodeRSA(publicPem)

function encrypt(s: string) {
  return privateKey.encryptPrivate(s).toString('base64url')
}

function decrypt(s: string) {
  return publicKey.decryptPublic(s).toString()
}

let publicKeyCache: Buffer | null = null
function getPublicKey() {
  if (!publicKeyCache) {
    publicKeyCache = Buffer.from(publicPem)
  }
  return publicKeyCache
}

export {
  encrypt,
  getPublicKey,
  decrypt
}
