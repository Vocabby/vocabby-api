import * as jwt from 'jsonwebtoken'

const jwtAlgorithm = 'HS256'
const jwtIssuer = 'vocabby.io'

function create(payload: any, expiresIn: number, secret: string): Promise<string> {
  return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, {
          algorithm: jwtAlgorithm,
          issuer: jwtIssuer,
          expiresIn,
      }, (err, token) =>  err ? reject(err) : resolve(token))
  })
}

function verify(token: string, secret: string) {
  return new Promise((resolve, reject) => {
      jwt.verify(token, secret, {
        algorithms: [jwtAlgorithm],
        issuer: jwtIssuer,
      }, (err, authToken) => err ? reject(err) : resolve(authToken))
  })
}

export default {
  create,
  verify,
}
