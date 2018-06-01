import * as Router from 'koa-router'
import graphql from './graphql'
import status from './status'

const router = new Router()

graphql(router)
status(router)

export default router
