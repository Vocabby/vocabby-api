import * as schema from '../../schemas/user'
import * as facebookService from '../../services/facebook'
import * as googlePlusService from '../../services/google-plus'
import * as userService from '../../services/user'
import { IAppContext, ICredentials, ISocialCredentials } from '../../types'
import { validate } from '../helpers'

export default {
  Mutation: {
    async signIn(_: any, credentials: ICredentials, ctx: IAppContext) {
      validate(credentials, schema.signIn)

      const user = await userService.login(credentials)
      const accessToken = await userService.getAccessToken(user)
      if (accessToken) {
        ctx.log.info({ userId: user._id, ip: ctx.request.ip }, 'User signed in.')
      }
      user.token = accessToken
      return user
    },

    async emailSignUp(_: any, credentials: ICredentials, ctx: IAppContext) {
      validate(credentials, schema.signUp)

      const user = await userService.create(credentials)
      const accessToken = await userService.getAccessToken(user)
      if (accessToken) {
        ctx.log.info({ userId: user._id, ip: ctx.request.ip }, 'User login.')
      }
      user.token = accessToken
      return user
    },

    async facebookSignUp(_: any, { token }: ISocialCredentials, ctx: IAppContext) {
      const userProps = await facebookService.getUserInfo(token)
      const user = await userService.createSocial(userProps)
      const accessToken = await userService.getAccessToken(user)
      if (accessToken) {
        ctx.log.info({ userId: user._id, ip: ctx.request.ip }, 'User login.')
      }
      user.token = accessToken
      return user
    },

    async googleSignUp(_: any, { token }: ISocialCredentials, ctx: IAppContext) {
      const userProps = await googlePlusService.getUserInfo(ctx.request.body.token)
      const user = await userService.createSocial(userProps)
      const accessToken = await userService.getAccessToken(user)
      if (accessToken) {
        ctx.log.info({ userId: user._id, ip: ctx.request.ip }, 'User login.')
      }
      user.token = accessToken
      return user
    },
  },
}
