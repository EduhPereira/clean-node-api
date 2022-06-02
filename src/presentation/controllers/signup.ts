import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { ServerError } from '../errors/server-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../interfaces/controller'
import { EmailValidator } from '../interfaces/email-validator'
import { HttpRequest, HttpResponse } from '../interfaces/http'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requireFields = ['name', 'email', 'password', 'passwordConfirmation']
    try {
      for (const field of requireFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (!this.emailValidator.isValid(httpRequest.body.email)) {
        return badRequest(new InvalidParamError('email'))
      }

      return {
        statusCode: 200,
        body: {
          message: 'ok'
        }
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
