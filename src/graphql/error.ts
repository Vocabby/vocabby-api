import { GraphQLError } from 'graphql'
import * as uuid from 'uuid'
import * as config from '../config'
import { AppError } from '../errors'
import log from '../logger'

const formatError = (error: GraphQLError) => {
  const message = error.message || 'Unknown error occurred.'
  const locations = error.locations
  const path = error.path
  const extensions = error.extensions

  if (error.originalError instanceof AppError) {
    const originalError = error.originalError as AppError
    const knownError = processKnownError(originalError)
    return { message, locations, path, extensions, ...knownError }
  } else {
    const unknownError = processUnknownError(error.originalError)
    return { message, locations, path, extensions, ...unknownError }
  }
}

function processKnownError(error: AppError) {
  log.warn({ error }, 'Handled error')

  const message = error.message
  const status = error.status
  const code = error.code
  const data = error.data && error.data.details.reduce((errors: any, info: any) => {
    errors[info.path] = info.message
    return errors
  }, {})

  return { status, code, data, message }
}

function processUnknownError(error: Error) {
  const correlationId = uuid.v1()
  log.error({ error, correlationId }, 'Unhandled error')

  if (config.environment === 'production') {
    return {
      correlationId,
      message: 'Unknown error occurred.',
      status: 500,
    }
  } else {
    return {
      message: error.message,
      stack: error.stack,
      status: 500,
    }
  }
}

export default formatError
