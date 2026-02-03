import type { PiniaPlugin } from 'pinia'

const PERSIST_IDS = ['accounts']

export const piniaLocalStoragePlugin: PiniaPlugin = ({ store }) => {
    if (!PERSIST_IDS.includes(store.$id)) return

    const saved = JSON.parse(localStorage.getItem(store.$id) ?? 'null')
    if (saved) {
        store.$patch(saved)
    }

    // Подписываемся один раз
    store.$subscribe((_, state) => {
        localStorage.setItem(store.$id, JSON.stringify(state))
    }, { flush: 'sync' })
}