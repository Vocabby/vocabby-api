import axios from 'axios'
import { INewUser } from '../types'

interface IGooglePlusUser {
  id: string,
  email: string,
  given_name: string,
  family_name: string,
  picture: string,
}

function buildUserUrl(token: string) {
  return `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`
}

export async function getUserInfo(token: string): Promise<INewUser> {
  const url = buildUserUrl(token)
  const response = await axios.get<IGooglePlusUser>(url)
  const googlePlusUser = response.data

  return {
    email: googlePlusUser.email,
    google_uid: googlePlusUser.id,
    first_name: googlePlusUser.given_name,
    last_name: googlePlusUser.family_name,
    avatarUrl: googlePlusUser.picture,
  }
}
