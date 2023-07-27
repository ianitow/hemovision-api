import { MissingParamError } from "../../../errors/missing-param-error"
import { CreateAccountController } from "../create-account-controller"

interface SutTypes {
  sut: CreateAccountController
}

const mockRequest = (): any => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  passwordConfirmation: 'any_password',
  birthDate: 'any_birthDate'

})
const makeSut = (): SutTypes => {
  const sut = new CreateAccountController()
  return { sut }
}

describe('CreateAccountController', () => {
  test('Should return an error if no name is provided', async () => {
    const { sut } = makeSut()
    const httpResponse =  sut.handle(mockRequest())
    expect(httpResponse).toThrow()
  })
  test('Should return  an error if no email is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password',
      birthDate: 'any_birthDate'
    })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toThrow(new MissingParamError('email'))
  })
})
