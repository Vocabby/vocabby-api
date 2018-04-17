/* tslint:disable: no-console */
import * as Koa from 'koa'
import * as koabody from 'koa-body'
import * as compress from 'koa-compress'
import * as helmet from 'koa-helmet'
import * as Router from 'koa-router'

import * as config from './config'
import graphql from './graphql'
import logger from './middleware/logger'

const app = new Koa()
const router = new Router()

router.post('/graphql', graphql)

// inject middleware
app.use(helmet())
app.use(compress())
app.use(logger())
app.use(koabody())

app.use(router.routes())

app.listen(config.httpPort)
console.log(`🚀 Server is running on port ${config.httpPort}`)
