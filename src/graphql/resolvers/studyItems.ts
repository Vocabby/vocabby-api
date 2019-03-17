import * as wordService from '../../services/word'
import { IAppContext, IStudyItem } from '../../types'

interface IStudyItemPayload {
  wordId: string
}

export default {
  StudyItem: {
    async word(studyItem: IStudyItem, _: any, ctx: IAppContext) {
      const word = await ctx.loaders.words.load(studyItem.wordId)
      return word
    },
  },
  Mutation: {
    async addStudyItem(_: any, data: IStudyItemPayload, ctx: IAppContext) {
      const word = await wordService.findById(data.wordId)
      return word
    },
    async removeStudyItem(_: any, data: IStudyItemPayload, ctx: IAppContext) {
      return true
    },
  },
}
