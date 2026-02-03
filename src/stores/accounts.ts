import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { Account } from "../entities";


export const useAccountsStore = defineStore('accounts', () => {
    const list = ref<Account[]>([])

    const accounts = computed(() => list.value)

    function addAccount(account: Account) {
        list.value.push(account)
    }

    function removeAccount(login: string) {
        list.value = list.value.filter(account => account.login !== login)
    }

    return {
        accounts,
        addAccount,
        removeAccount,
    }
})