import * as userConfig from '../config'
import { UnauthorizedError } from '../errors'
import { parseHeader } from '../helpers/bearer'
import jwt from '../helpers/jwt'
import log from '../logger'
import * as userService from '../services/user'
import { IAppContext, IMiddleware, IUserJWT } from '../types'

async function verifyToken<TResult>(token: string, secret: string): Promise<TResult> {
    try {
      return await jwt.verify(token, secret) as TResult
    } catch (err) {
      log.debug({ err }, 'Invalid Authorization token.')
    }
}

export const requireUser = async (ctx: IAppContext, middleware: IMiddleware) => {
  const token = parseHeader(ctx.header.authorization)
  if (!token) {
    throw new UnauthorizedError()
  }

  const decoded = await verifyToken<IUserJWT>(token, userConfig.jwtOptions.secret)
  if (!decoded) {
    throw new UnauthorizedError()
  }

  const user = await userService.findById(decoded.userId)
  if (!user) {
    throw new UnauthorizedError()
  }

  ctx.state = ctx.state || {}
  ctx.state.userId = user._id

  await middleware()
}
