import { MissingParamError } from '../../errors/missing-param-error'
import { type Controller } from '../../protocols/controller'
import { type HttpResponse } from '../../protocols/http-response'

export class CreateAccountController implements Controller {
  async handle (request: any): Promise<HttpResponse> {
    if (!request.email) throw new MissingParamError('email')
    if (!request.name) throw new MissingParamError('name')
    return {
      statusCode: 200,
      body: {}

    }
  }
}
