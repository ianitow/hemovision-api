import { type CreateAccount } from '../../../domain/account/usecases/create-account'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { type Controller } from '../../protocols/controller'
import { type HttpResponse } from '../../protocols/http-response'

export class CreateAccountController implements Controller {
  private readonly createAccount: CreateAccount
  constructor (createAccount: CreateAccount) {
    this.createAccount = createAccount
  }

  async handle (request: any): Promise<HttpResponse> {
    try {
      if (!request.email) return badRequest(new MissingParamError('email'))
      if (!request.name) return badRequest(new MissingParamError('name'))
      await this.createAccount.create(request)

      return ok(true)
    } catch (error) {
      if (error instanceof Error) { return serverError(error) }
      return serverError(new Error())
    }
  }
}
