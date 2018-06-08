import { GraphQLScalarType } from 'graphql'
import { resourceUrl } from '../../helpers/url'

export default {
  ResourceUrl: new GraphQLScalarType({
    name: 'ResourceUrl',
    serialize(value) {
      return value ? resourceUrl(value) : null
    },
  }),
}
