/* tslint:disable: no-console */
import * as cors from 'kcors'
import * as Koa from 'koa'
import * as koabody from 'koa-body'
import * as compress from 'koa-compress'
import * as helmet from 'koa-helmet'
import * as throng from 'throng'

import * as config from './config'
import authorization from './middleware/authorization'
import logger from './middleware/logger'
import router from './routes'

const app = new Koa()

app.use(helmet())
app.use(compress())
app.use(logger())
app.use(authorization())
app.use(cors())
app.use(koabody())

app.use(router.routes())

const startFunction = () => {
  app.listen(config.httpPort)
  console.log(`🚀 Server is running on port ${config.httpPort}`)
}

throng(startFunction)
