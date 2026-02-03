import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createStore} from "./plugins/store"
import {createPrimeVue} from "./plugins/prime-vue"

const app = createApp(App)

createStore(app)
createPrimeVue(app)

app.mount('#app')
