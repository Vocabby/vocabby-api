import { Schema, validate as joiValidate } from 'joi'
import { ValidationError } from '../errors'

export function validate(value: any, schema: Schema) {
  const result = joiValidate(value, schema)
  if (result.error) {
    throw new ValidationError(result.error)
  }
}
