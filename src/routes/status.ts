import * as fs from 'fs'
import * as Router from 'koa-router'
import * as path from 'path'
import * as config from '../config'
import { IAppContext } from '../types'

const start = new Date()
const packagePath = path.join(__dirname, '../../package.json')
const packageInfo = JSON.parse(fs.readFileSync(packagePath, 'utf8'))

export default (router: Router) => {
  router.get('/status', (ctx: IAppContext) => {
      ctx.body = {
          name: config.appName,
          start,
          version: packageInfo.version,
      }
  })
}
