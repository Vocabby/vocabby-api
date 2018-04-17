import log from '../logger'
import { IAppContext, IMiddleware } from '../types'

export default () => async (ctx: IAppContext, next: IMiddleware) => {
    ctx.log = log.child({
        ip: ctx.request.ip,
        requestId: ctx.request.headers['x-request-id'],
        userId: ctx.state.userId,
    })

    await next()
}
