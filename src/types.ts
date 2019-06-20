import { ObjectId } from 'bson'
import { Context } from 'koa'
import Logger from './logger'

export type IMiddleware = () => Promise<void>

export interface ICredentials {
  email: string
  password: string
}

export interface ISocialCredentials {
  token: string
}

export interface INewUser {
  email: string,
  google_uid?: string,
  facebook_uid?: string,
  first_name?: string,
  last_name?: string,
  avatarUrl?: string,
}

export interface IUser extends INewUser {
  _id: string
  token: string,
  encrypted_password: string,
  esStats?: IStatistic,
  esFavoriteIds?: ObjectId[],
  esStudyItems?: IStudyItem[],
}

export interface IStatistic {
  session: number,
  currentStreak: number,
  bestStreak: number,
  dates: Date[],
  lastSessionOn: Date,
  perfectSessionCount: number,
}

export interface IStudyItem {
  wordId: string,
  nextReviewAt: Date,
  _id: string,
  reviewInterval: number,
  numOfReviews: number,
  easinessFactor: number,
}

export interface IRequestState {
  userId?: string,
}

export interface IAppContext extends Context {
  state: IRequestState
  log: typeof Logger
  loaders: any
}

export interface IUserJWT {
  userId: string
  email: string
  jwtVersion: number
}

export interface IVocab {
  _id: string,
  title: string,
  group: string,
  preview: string,
  previewUrl: string,
  isFavorite: boolean,
  mediaUrl: string,
  slug: string,
  wordCount: number,
  word_ids: string[],
  content: string,
  contentTranslated: string,
}

export interface IWord {
  _id: string,
  title: string,
  definition: string,
  article: string,
  audio: string,
  audioUrl: string,
}

export type TPos = 'noun' | 'adjective' | 'verb' | 'adverb'

export interface IOppositeGroup {
  pos: TPos
  left: string[]
  definition_left: string
  right: string[]
  definition_right: string
}

export interface IPhrasalVerb {
  _id: string
  title: string
  definition: string
  prepositions: string[]
}
