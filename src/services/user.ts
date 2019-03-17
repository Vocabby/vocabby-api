import { ObjectId } from 'bson'
import * as config from '../config'
import client from '../data'
import { InvalidEmailPasswordError, NotFoundError, UserConflictError } from '../errors'
import * as bcrypt from '../helpers/bcrypt'
import jwt from '../helpers/jwt'
import { ICredentials, INewUser, IUser, IUserJWT } from '../types'
import * as wordService from './word'

export async function login(data: ICredentials) {
  const db = await client()
  const collection = await db.collection('users')

  const user: IUser = await collection.findOne({ email: data.email })
  if (!user) {
    throw new InvalidEmailPasswordError()
  }

  const valid = await bcrypt.compare(data.password, user.encrypted_password)
  if (!valid) {
    throw new InvalidEmailPasswordError()
  }

  return user
}

export async function findById(id: string) {
  const db = await client()
  const collection = await db.collection('users')
  const user = await collection.findOne<IUser>({ _id: new ObjectId(id) })
  return user
}

export async function findManyById(ids: string[]) {
  const db = await client()
  const collection = await db.collection('users')
  const users = await collection.find<IUser>({
    _id: {
        $in: ids.map(id => new ObjectId(id)),
    },
  }).toArray()
  return users
}

export async function findByEmail(email: string) {
  const db = await client()
  const collection = await db.collection('users')
  const user = await collection.findOne<IUser>({ email })
  return user
}

export async function getAccessToken(user: IUser) {
  const jwtUser: IUserJWT = {
    userId: user._id.toString(),
    email: user.email,
    jwtVersion: config.jwtOptions.version,
  }

  const accessToken = await jwt.create(jwtUser, config.jwtOptions.expiration, config.jwtOptions.secret)
  return accessToken
}

export async function create({ email, password }: ICredentials) {
  const existingUser = await findByEmail(email)
  if (existingUser) {
    throw new UserConflictError()
  }

  const passwordHash = await bcrypt.hash(password)
  const db = await client()
  const collection = await db.collection('users')
  const results = await collection.insertOne({ email, encrypted_password: passwordHash })
  const user: IUser = results.ops[0]
  return user
}

export async function createSocial(props: INewUser) {
  const db = await client()
  const collection = await db.collection('users')
  const filter = { email: props.email }
  const result = await collection.findOneAndUpdate(filter, { $set: props }, { upsert: true })
  return result.value as IUser
}

export async function addStudyItem(wordId: string, user: IUser) {
  const word = wordService.findById(wordId)
  if (!word) {
    throw new NotFoundError()
  }

  const studyItem = user.esStudyItems.find(item => item.wordId === wordId)
  if (!studyItem) {
    // study_item = current_user.es_study_items.create!(word: word, next_review_at: DateTime.now)
  }

  return studyItem
}
