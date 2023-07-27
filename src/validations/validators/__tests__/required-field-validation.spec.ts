
import { MissingParamError } from "../../../presentation/errors/missing-param-error"
import { Validation } from "../../../presentation/protocols/validation"
import { RequiredFieldValidation } from "../required-field-validation"

interface SutTypes{
    sut:Validation
}
const makeSut = ():SutTypes =>{
   
    return {sut: new RequiredFieldValidation('any_field')}
} 
describe('MissingParamErrorValidation', () => {
  test('Should returns an error if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      another_field:''
    })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
  test('Should returns null if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      any_field:'any_value'
    })
    expect(error).toBeNull()
  })
})
