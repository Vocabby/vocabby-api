import * as wordService from '../../services/word'
import { IWord } from '../../types'

export default {
  Query: {
    async randomWords(_: any, { count }: { count: number }) {
      const words = await wordService.randomByWordSet('5778c9be77f9eb0003550694', count)
      return words
    },
  },
  Word: {
    audioUrl(word: IWord) {
      return word.audio
    },
  },
}
