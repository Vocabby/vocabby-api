import { resourceUrl } from '../../helpers/url'
import * as vocabService from '../../services/vocab'
import { IAppContext, IStudyItem, IUser, IVocab, IWord } from '../../types'

const vocabMapper = (vocab: IVocab): IVocab => ({
  ...vocab,
  id: vocab._id,
  previewUrl: resourceUrl(vocab.preview),
  wordCount: vocab.word_ids.length,
})

const wordMapper = (word: IWord): IWord => ({
  ...word,
  id: word._id,
})

export default {
  Query: {
    async vocabs() {
      const vocabs = await vocabService.findAll()
      return vocabs.map(vocabMapper)
    },
    async vocabBySlug(_: any, { slug }: { slug: string }, ctx: IAppContext) {
      const vocab = await ctx.loaders.vocabs.load(slug)
      return vocabMapper(vocab)
    },
  },
  Vocab: {
    async words(vocab: IVocab, _: any, ctx: IAppContext) {
      const words = await ctx.loaders.words.loadMany(vocab.word_ids)
      return words.map(wordMapper)
    },
    async studyItems(vocab: IVocab, _: any, ctx: IAppContext) {
      if (ctx.state.userId) {
        const user: IUser = await ctx.loaders.users.load(ctx.state.userId)
        if (user.esStudyItems) {
          const vocabWords = vocab.word_ids.reduce(((map: any, value) => {
            map[value] = true
            return map
          }), {})
          return user.esStudyItems.filter(studyItem => vocabWords[studyItem.wordId])
        }
      }
      return [] as IStudyItem[]
    },
  },
}
