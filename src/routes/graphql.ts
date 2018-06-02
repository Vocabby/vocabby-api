import { graphqlKoa } from 'apollo-server-koa'
import * as Router from 'koa-router'
import loaders from '../data/loaders'
import formatError from '../graphql/error'
import schema from '../graphql/schema'
import { IAppContext } from '../types'

export default (router: Router) => {
  router.post('/graphql', graphqlKoa((ctx: IAppContext) => {
    return {
      schema,
      debug: true,
      formatError,
      context: {
        ...ctx,
        loaders: loaders(),
      },
    }
  }))
}
