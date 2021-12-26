import AppConfig from '../types/AppConfig'
import { load } from 'js-yaml'
import { readFileSync } from "fs";

const appConfig = <AppConfig>load(
  readFileSync('src/config/config.yml', 'utf-8')
)

export default appConfig
