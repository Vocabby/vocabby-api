import * as dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

export const appName = 'vocabby'
export const logLevel = process.env.LOG_LEVEL || 'info'
export const environment = process.env.NODE_ENV || 'development'
export const httpPort = process.env.PORT || 3000
export const connectionString = process.env.DATABASE_URL
export const facebookAppID = process.env.FACEBOOK_APP_ID

export const jwtOptions = {
  version: 1,
  expiration: 36000, // 10h
  secret: process.env.JWT_USER_SECRET,
}
