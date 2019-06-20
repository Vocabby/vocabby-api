import client from '../data'
import { IOppositeGroup } from '../types'

export async function random(count: number): Promise<ReadonlyArray<IOppositeGroup>> {
  const db = await client()
  const collection = await db.collection('opposite_groups')
  const groups = await collection.aggregate<IOppositeGroup>([
    { $sample : { size: count } },
  ]).toArray()

  return groups
}
