import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
import { CompareFieldValidation } from '../compare-field-validation'

interface SutTypes {
  sut: CompareFieldValidation
}
const makeSut = (): SutTypes => {
  return {
    sut: new CompareFieldValidation('any_field', 'field_to_compare')
  }
}
describe('compare-field-validation', () => {
  test('Should returns an error if field are different', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      any_field1: 'any_value',
      field_to_compare: 'different_value'
    })
    expect(error).toEqual(new InvalidParamError('field_to_compare'))
  })
})
