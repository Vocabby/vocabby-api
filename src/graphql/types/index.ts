import * as fs from 'fs'
import * as path from 'path'

const paths = [
  'api.gql',
  'studyItems.gql',
  'vocabs.gql',
  'users.gql',
  'words.gql',
]

export default paths.map(fileName => fs.readFileSync(path.join(__dirname, fileName), 'utf8'))
