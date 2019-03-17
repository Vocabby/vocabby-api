import client from '../data'
import { NotFoundError } from '../errors'
import { IVocab } from '../types'

export async function findAll() {
  const db = await client()
  const collection = await db.collection('es_vocabs')
  const vocabs = await collection.find<IVocab>({ published: true }).toArray()
  return vocabs
}

export async function findBySlug(slug: string) {
  const db = await client()
  const collection = await db.collection('es_vocabs')

  const vocab = await collection.findOne<IVocab>({ slug })
  if (!vocab) {
    throw new NotFoundError()
  }

  return vocab
}

export async function findManyBySlug(slugs: string[]) {
  const db = await client()
  const collection = await db.collection('es_vocabs')
  const users = await collection.find<IVocab>({
    slug: {
        $in: slugs,
    },
  }).toArray()
  return users
}
