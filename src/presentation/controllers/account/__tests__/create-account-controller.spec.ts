import { CreateAccountController } from '../create-account-controller'
import { MissingParamError } from './../../../errors/missing-param-error'

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
  test('Should throws an error if no name is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = sut.handle({
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password',
      birthDate: 'any_birthDate'
    })

    await expect(httpResponse).rejects.toThrow(new MissingParamError('name'))
  })
  test('Should throws an error if no email is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = sut.handle({
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password',
      birthDate: 'any_birthDate'
    })
    await expect(httpResponse).rejects.toThrow(new MissingParamError('email'))
  })
  test('Should throws an error if no email is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = sut.handle({
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password',
      birthDate: 'any_birthDate'
    })
    await expect(httpResponse).rejects.toThrow(new MissingParamError('email'))
  })
  test('Should returns 200 in all data is valid', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(200)
  })
})
