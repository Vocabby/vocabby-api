import * as pino from 'pino'
import * as config from './config'

export default pino({
    level: config.logLevel,
    name: config.appName,
    prettyPrint: config.environment === 'development',
    serializers: {
        err: pino.stdSerializers.err,
        req: pino.stdSerializers.req,
        res: pino.stdSerializers.res,
    },
})
