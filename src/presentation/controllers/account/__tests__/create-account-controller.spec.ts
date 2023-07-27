import { type CreateAccount } from '../../../../domain/account/usecases/create-account'
import { badRequest, ok } from '../../../helpers/http-helpers'
import { MissingParamError } from './../../../errors/missing-param-error'
import { CreateAccountController } from './../create-account-controller'

interface SutTypes {
  sut: CreateAccountController
  createAccountStub: CreateAccount
}

const mockRequest = (): any => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  passwordConfirmation: 'any_password',
  birthDate: 'any_birthDate'

})
const makeSut = (): SutTypes => {
  class CreateAccountStub implements CreateAccount {
    async create (account: CreateAccount.Params): Promise<boolean> {
      return true
    }
  }
  const createAccountStub = new CreateAccountStub()
  const sut = new CreateAccountController(createAccountStub)
  return { sut,createAccountStub }
}

describe('CreateAccountController', () => {
  test('Should returns an error if no name is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password',
      birthDate: 'any_birthDate'
    })

    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })
  test('Should returns an error if no email is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password',
      birthDate: 'any_birthDate'
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
  test('Should returns 200 in all data is valid', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(200)
  })
  test('Should create account if all validations are correct', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(true))
  })
})
