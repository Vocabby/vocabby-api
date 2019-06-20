import client from '../data'
import { IPhrasalVerb } from '../types'

export async function random(count: number): Promise<ReadonlyArray<IPhrasalVerb>> {
  const db = await client()
  const collection = await db.collection('phrasal_verbs')
  const items = await collection.aggregate<IPhrasalVerb>([
    { $match: { definition: { $nin: [null, ''] } } },
    { $sample : { size: count } },
  ]).toArray()

  return items
}
