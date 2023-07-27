import { type Controller } from '../protocols/controller'
import { type HttpResponse } from './../protocols/http-response'

export class CreateAccountController implements Controller {
  async handle (request: any): Promise<HttpResponse> {
    return {
      statusCode: 400,
      body: {}

    }
  }
}
