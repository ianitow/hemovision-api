import { type CreateAccount } from '../../../domain/account/usecases/create-account'
import { type ValidationComposite } from '../../../validations/validators/validation-composite'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { type Controller } from '../../protocols/controller'
import { type HttpResponse } from '../../protocols/http-response'

export class CreateAccountController implements Controller {
  private readonly createAccount: CreateAccount
  private readonly validatorComposite: ValidationComposite
  constructor (createAccount: CreateAccount, validatorComposite: ValidationComposite) {
    this.createAccount = createAccount
    this.validatorComposite = validatorComposite
  }

  async handle (request: any): Promise<HttpResponse> {
    try {
      const error = this.validatorComposite.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.createAccount.create(request)

      return ok(true)
    } catch (error) {
      if (error instanceof Error) { return serverError(error) }
      return serverError(new Error())
    }
  }
}
