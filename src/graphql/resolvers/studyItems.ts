import { IAppContext, IStudyItem } from '../../types'

export default {
  StudyItem: {
    async word(studyItem: IStudyItem, _: any, ctx: IAppContext) {
      const word = await ctx.loaders.words.load(studyItem.wordId)
      return word
    },
  },
}
