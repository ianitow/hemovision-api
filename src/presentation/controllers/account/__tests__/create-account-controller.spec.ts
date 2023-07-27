import { type CreateAccount } from '../../../../domain/account/usecases/create-account'
import { ValidationComposite } from '../../../../validations/validators/validation-composite'
import { badRequest, ok } from '../../../helpers/http-helpers'
import { type Validation } from '../../../protocols/validation'
import { MissingParamError } from './../../../errors/missing-param-error'
import { CreateAccountController } from './../create-account-controller'

interface SutTypes {
  sut: CreateAccountController
  createAccountStub: CreateAccount
  validationCompositeStub: ValidationComposite
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
  const mockValidation = (): Validation => {
    class ValidationSpy implements Validation {
      input: any
      validate (input: any): Error | null {
        this.input = input
        return null
      }
    }
    return new ValidationSpy()
  }

  const createAccountStub = new CreateAccountStub()
  const validationCompositeStub = new ValidationComposite([
    mockValidation(),
    mockValidation()
  ])
  const sut = new CreateAccountController(createAccountStub, validationCompositeStub)
  return { sut, createAccountStub,validationCompositeStub }
}

describe('CreateAccountController', () => {
  test('Should returns an error if Validations fails', async () => {
    const { sut,validationCompositeStub } = makeSut()
    jest.spyOn(validationCompositeStub,'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle({
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password',
      birthDate: 'any_birthDate'
    })

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
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
