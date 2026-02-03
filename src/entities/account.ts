export type AccountType = 'LDAP' | 'local'

type AccountBase = {
    id: number
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

export function createAccount(): Account {
    return {
        id: Date.now(),
        tags: [],
        login: '',
        type: 'local',
        password: ''
    }
}

export const accountTypes: { value: AccountType, name: string}[] = [
    { value: "LDAP", name: 'LDAP' },
    { value: "local", name: 'Локальная' },
]