import { MongoClient } from 'mongodb'
import * as config from '../config'

let client: MongoClient

export default async function init() {
  if (!client) {
    client = await MongoClient.connect(config.connectionString)
  }
  return client.db()
}
