import { createPool, MysqlError, FieldInfo } from 'mysql'
import appConfig from "../config";
import { useCleanUp } from '../core/cleanUp'
import {createLogger} from "bunyan";

const userTable = 'av_user'
const logger = createLogger({ name: 'mysql', stream: process.stdout })

const pool = createPool(appConfig.mysql)
logger.info('mysql connected')

useCleanUp(() => pool.end(err => {
  console.log(err ?? "pool released")
}))

interface QueryResult<T = any> {
  err: MysqlError | null,
  results: T[],
  fields: FieldInfo[] | undefined
}

function query<T>(sql: string, values?: any): Promise<QueryResult<T>> {
  return new Promise(resolve => {
    pool.query(sql, values ?? null, ((err, results, fields) => {
      logger.info('mysql query')
      resolve({ err, results: <T[]>results, fields })
    }))
  })
}

interface SelectQuery<T> {
  limit?: number,
  where?: T,
  fields?: (keyof T)[]
}

function select<T extends object>(q?: SelectQuery<T>) {
  if (!q) return query<T>(`select * from ${userTable}`)
  const {limit, where, fields} = q

  let whereSql = ''
  let fieldValues: (string | number)[] | null = null

  if (where) {
    const keys = Reflect.ownKeys(where)
    if (keys.length) {
      whereSql += ' where '
      fieldValues = []
      const fieldNames: string[] = []

      for (const key of keys) {
        if (typeof key === 'string') {
          fieldNames.push(`${key}=?`)
          fieldValues.push(<string | number>Reflect.get(where, key))
        }
      }
      whereSql += fieldNames.join(' and ')
    }
  }
  const sql = `select ${(fields ?? ['*']).join(',')} from ${userTable}${whereSql}${limit ? ` limit ${limit}`:''}`
  return query<T>(sql, fieldValues)
}

export {
  pool,
  query,
  select
}
