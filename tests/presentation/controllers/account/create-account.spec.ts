import { CreateAccountController } from '../../../../src/presentation/controllers/create-account-controller'

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
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(400)
  })
})
