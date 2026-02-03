import {type App} from "vue";
import {createPinia} from 'pinia'
import {piniaLocalStoragePlugin} from "./plugins/persist.ts";

export function createStore(app: App) {
    const pinia = createPinia()
    pinia.use(piniaLocalStoragePlugin)

    app.use(pinia)
}