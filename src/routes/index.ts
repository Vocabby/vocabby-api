import * as Router from 'koa-router'
import games from './games'
import graphql from './graphql'
import status from './status'

const router = new Router()

graphql(router)
status(router)
games(router)

export default router
