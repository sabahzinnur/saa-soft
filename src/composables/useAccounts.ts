import { useAccountsStore } from "../stores"
export function useAccounts() {
    const store = useAccountsStore()


    return {
        accounts: store.accounts,
        addAccount: store.addAccount,
        removeAccount: store.removeAccount,
        updateAccount: store.updateAccount,
    }
}