import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { merge } from 'lodash'

import resources from './resources'
import studyItems from './studyItems'
import users from './users'
import vocabs from './vocabs'
import words from './words'

export default merge(vocabs, words, studyItems, users, resources) as IResolvers
