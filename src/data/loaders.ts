
import * as DataLoader from 'dataloader'
import { IUser, IVocab, IWord } from '../types'

import * as userService from '../services/user'
import * as vocabService from '../services/vocab'
import * as wordService from '../services/word'

const loaders = () => ({
  users: new DataLoader<string, IUser>(ids => userService.findManyById(ids)),
  words: new DataLoader<string, IWord>(ids => wordService.findManyById(ids)),
  vocabs: new DataLoader<string, IVocab>(slugs => vocabService.findManyBySlug(slugs)),
})

export default loaders
