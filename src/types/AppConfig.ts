import { PoolConfig } from 'mysql'

export default interface AppConfig {
  mysql: PoolConfig,
  http: {
    port: number,
    private_pem: string,
    public_pem: string
  },
  app: {
    admin: string[]
  }
}
