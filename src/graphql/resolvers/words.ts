import * as wordService from '../../services/word'
import { IWord } from '../../types'

export default {
  Query: {
    async randomWords(_: any, { count, fromSet }: { count: number, fromSet?: boolean }) {
      if (fromSet) {
        return await wordService.randomByWordSet('5778c9be77f9eb0003550694', count)
      } else {
        return await wordService.random(count)
      }
    },
  },
  Word: {
    audioUrl(word: IWord) {
      return word.audio
    },
  },
}
