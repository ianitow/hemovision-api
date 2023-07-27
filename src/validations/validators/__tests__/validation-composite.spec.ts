import { MissingParamError } from '../../../presentation/errors/missing-param-error'
import { RequiredFieldValidation } from '../required-field-validation'
import { ValidationComposite } from '../validation-composite'

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const sut = new ValidationComposite([
      new RequiredFieldValidation('any_field'),
      new RequiredFieldValidation('field_to_fail')
    ])
    const error = sut.validate({
      any_field: true
    })
    expect(error).toEqual(new MissingParamError('field_to_fail'))
  })
})
