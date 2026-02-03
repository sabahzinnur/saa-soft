import { type App } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import {Button} from "primevue";


export function createPrimeVue(app: App) {
    app.use(PrimeVue, {
        theme: {
            preset: Aura
        }
    });

    app.component('Button', Button);
}