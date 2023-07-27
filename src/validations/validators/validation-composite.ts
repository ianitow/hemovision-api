import { type Validation } from './../../presentation/protocols/validation'
export class ValidationComposite implements Validation {
  constructor (public readonly validators: Validation[]) {}
  validate (input: any): Error | null {
    for (const validator of this.validators) {
      const error = validator.validate(input)
      if (error) return error
    }
    return null
  }
}
