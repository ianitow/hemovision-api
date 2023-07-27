import { type HttpResponse } from './http-response'

export interface Controller {
  handle: (request: any) => Promise<HttpResponse>
}
