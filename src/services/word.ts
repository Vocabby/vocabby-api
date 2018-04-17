import { ObjectId } from 'bson'
import client from '../data'
import { IWord } from '../types'

export async function randomByWordSet(setId: string, count: number): Promise<IWord[]> {
  const db = await client()
  const collection = await db.collection('en_words')
  const words = await collection.aggregate<IWord>([
    { $match: { word_set_id: new ObjectId(setId) } },
    { $sample : { size: count } },
  ]).toArray()

  return words
}

export async function findManyById(ids: string[]) {
  const db = await client()
  const collection = await db.collection('es_words')
  const users = await collection.find<IWord>({
    _id: {
        $in: ids.map(id => new ObjectId(id)),
    },
  }).toArray()
  return users
}
