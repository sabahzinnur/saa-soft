export type AccountType = 'LDAP' | 'local'

type AccountBase = {
    id: string
    tags: string[]
    login: string
    type: AccountType
}

export type LDAPAccount = AccountBase & {
    type: 'LDAP'
    password: null
}

export type LocalAccount = AccountBase & {
    type: 'local'
    password: string
}

export type Account = LDAPAccount | LocalAccount