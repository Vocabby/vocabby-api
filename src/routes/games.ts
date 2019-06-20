import * as Router from 'koa-router'
import { compose, take } from 'ramda'
import * as arrayUtils from '../helpers/array'
import * as oppositeGroupService from '../services/opposite-group'
import * as phrasalVerbService from '../services/phrasal-verb'
import * as wordService from '../services/word'
import { IAppContext } from '../types'

export default (router: Router) => {
  router.get('/games/word-builder', async (ctx: IAppContext) => {
    const words = await wordService.random(8)
    ctx.body = {
        values: words.map(({ _id, title, definition, audio }) => ({
          id: _id,
          title,
          definition,
          audio,
        })),
    }
  })

  router.get('/games/odd-one-out', async (ctx: IAppContext) => {
    const oppositeGroups = await oppositeGroupService.random(8)
    ctx.body = {
      values: oppositeGroups.map((group, index) => {
        const [chosenLabel, decoyLabel] =  arrayUtils.shuffle(['left' as const, 'right' as const])
        const word = arrayUtils.shuffle(group[chosenLabel])[0]
        const options = [word, ...group[decoyLabel]]

        return {
          id: index,
          options: compose(
            arrayUtils.shuffle,
            take(4),
          )(options),
          answer: word,
          // @ts-ignore
          hint: group[`definition_${chosenLabel}`],
          // @ts-ignore
          opposite: group[`definition_${decoyLabel}`],
        }
      }),
    }
  })

  router.get('/games/phrasal-verbs', async (ctx: IAppContext) => {
    const verbs = await phrasalVerbService.random(8)
    ctx.body = {
      values: verbs.map(({ _id, prepositions, title, definition }) => ({
        id: _id,
        title,
        definition,
        prepositions,
      })),
    }
  })
}
