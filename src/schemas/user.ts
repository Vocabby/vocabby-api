import * as Joi from 'joi'

const emailSchema = () => Joi
  .string()
  .max(100)
  .email()
  .required()
  .label('E-mail')

const passwordSchema = () => Joi
  .string()
  .min(6)
  .max(100)
  .required()
  .label('Password')

export const signIn = Joi.object({
  email: emailSchema(),
  password: passwordSchema(),
})

export const signUp = Joi.object({
  email: emailSchema(),
  password: passwordSchema(),
})
