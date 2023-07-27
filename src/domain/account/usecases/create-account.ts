export interface CreateAccount {
  create: (account: CreateAccount.Params) => Promise<CreateAccount.Result>
}

export namespace CreateAccount{
  export type Params = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
    birthDate: string
  }
  export type Result = boolean
}
