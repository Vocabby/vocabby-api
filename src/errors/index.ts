// tslint:disable:max-classes-per-file

import { STATUS_CODES } from 'http'
import ErrorCodes from './error-codes'

type AppErrorData = string | { [propName: string]: any }

class AppError extends Error {
  public status: number
  public code: string
  public data?: any

  constructor(status: number, code: string, data?: AppErrorData) {
    const message = typeof data === 'string' ? data : null
    const objMessage = (typeof data === 'object' && data.message) ? data.message : null
    const errorMessage = message || objMessage || STATUS_CODES[status]

    super(errorMessage)
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.code = code
    this.status = status

    if (typeof data === 'object') {
      Reflect.deleteProperty(data, 'message')
      this.data = data
    }
  }
}

class InternalServerError extends AppError {
  constructor(data?: AppErrorData, errorCode = ErrorCodes.INTERNAL) {
    super(500, errorCode, data)
  }
}

class ValidationError extends AppError {
  constructor(data?: AppErrorData) {
    super(422, ErrorCodes.VALIDATION, data)
  }
}

class UnauthorizedError extends AppError {
  constructor(data?: AppErrorData, errorCode = ErrorCodes.UNAUTHORIZED) {
    super(401, errorCode, data)
  }
}

class NotFoundError extends AppError {
  constructor(data?: AppErrorData) {
    super(404, ErrorCodes.NOT_FOUND, data)
  }
}

class InvalidRequestParamsError extends AppError {
  constructor(data?: AppErrorData) {
    super(400, ErrorCodes.INVALID_PARAMS, data)
  }
}

class ConflictError extends AppError {
  constructor(data?: AppErrorData, errorCode = ErrorCodes.CONFLICT) {
    super(409, errorCode, data)
  }
}

class InvalidEmailPasswordError extends UnauthorizedError {
  constructor() {
    super('Invalid email/password combination.', ErrorCodes.INVALID_EMAIL_PASSWORD)
  }
}

class UserConflictError extends ConflictError {
  constructor() {
      super('User with this email already exists.')
  }
}

export {
  ErrorCodes,
  AppError,
  InternalServerError,
  ValidationError,
  UnauthorizedError,
  NotFoundError,
  InvalidRequestParamsError,
  ConflictError,
  InvalidEmailPasswordError,
  UserConflictError,
}
