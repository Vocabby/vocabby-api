import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { merge } from 'lodash'

import users from './users'
import vocabs from './vocabs'
import words from './words'

export default merge(vocabs, words, users) as IResolvers
