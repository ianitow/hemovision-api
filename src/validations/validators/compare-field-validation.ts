import { InvalidParamError } from '../../presentation/errors/invalid-param-error'
import { type Validation } from '../../presentation/protocols/validation'

export class CompareFieldValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly fieldToCompare: string) {}
  validate (input: any): Error | null {
    if (input[this.fieldName] !== input[this.fieldToCompare]) {
      return new InvalidParamError(this.fieldToCompare)
    }
    return null
  }
}
