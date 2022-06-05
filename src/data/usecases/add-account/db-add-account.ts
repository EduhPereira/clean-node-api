import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-acount'
import { Encrypter } from '../../interfaces/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)

    return await new Promise(resolve => resolve({
      id: '',
      name: '',
      email: '',
      password: ''
    }))
  }
}
