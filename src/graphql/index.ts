import { graphqlKoa } from 'apollo-server-koa'
import loaders from '../data/loaders'
import { IAppContext } from '../types'
import formatError from './error'
import schema from './schema'

export default graphqlKoa((ctx: IAppContext) => {
  return {
    schema,
    debug: true,
    formatError,
    context: {
      ...ctx,
      loaders: loaders(),
    },
  }
})
