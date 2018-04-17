import * as wordService from '../../services/word'
import { IAppContext, IVocab } from '../../types'

export default {
  Word: async (vocab: IVocab, _: any, ctx: IAppContext) => {
    const words = await ctx.loaders.words.loadMany(vocab.word_ids)
    return words
  },
  Query: {
    async randomWords(_: any, { count }: { count: number }) {
      const words = await wordService.randomByWordSet('5778c9be77f9eb0003550694', count)
      return words
    },
  },
}
