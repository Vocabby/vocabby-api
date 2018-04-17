import axios from 'axios'
import * as config from '../config'
import { ValidationError } from '../errors'
import { INewUser } from '../types'

interface IDebugToken {
  app_id: string,
}

interface IFacebookUser {
  id: string,
  email: string,
  first_name: string,
  last_name: string,
}

const BASE_URL = 'https://graph.facebook.com'

function buildDebugTokenUrl(token: string) {
  return `${BASE_URL}/debug_token?input_token=${token}&access_token=${token}`
}

function buildUserUrl(token: string) {
  return `${BASE_URL}/me?fields=email,first_name,last_name&access_token=${token}`
}

export async function getUserInfo(token: string): Promise<INewUser> {
  const debugTokenUrl = buildDebugTokenUrl(token)
  const response = await axios.get<IDebugToken>(debugTokenUrl)
  if (response.data.app_id !== config.facebookAppID) {
    throw new ValidationError()
  }

  const userUrl = buildUserUrl(token)
  const userResponse = await axios.get<IFacebookUser>(userUrl)
  const facebookUser = userResponse.data

  return {
    email: facebookUser.email,
    first_name: facebookUser.first_name,
    last_name: facebookUser.last_name,
    facebook_uid: facebookUser.id,
  }
}
