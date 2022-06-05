import { EmailValidator } from '../presentation/interfaces'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: String): boolean {
    return false
  }
}
