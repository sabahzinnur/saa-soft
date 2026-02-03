import {defineStore} from 'pinia'

import type {Account} from "../entities"


export const useAccountsStore = defineStore('accounts', {
    state: () => ({
        list: [] as Account[],
    }),
    getters: {
        accounts: (state) => state.list,
    },
    actions: {
        addAccount(account: Account) {
            this.list.push(account)
        },
        removeAccount(id: number) {
            this.list = this.list
                .filter(account => account.id !== id)
        },
        updateAccount(updates: Account) {
            const index = this.list
                .findIndex(account => account.id === updates.id)
            if (index === -1) return

            this.list[index] = updates
        },
    },
})