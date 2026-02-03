import { type App } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'

import {Button, InputText, Message} from "primevue"
import { Form } from '@primevue/forms'
import { FormField } from '@primevue/forms'
import Password from 'primevue/password'
import Select from 'primevue/select'

export function createPrimeVue(app: App) {
    app.use(PrimeVue, {
        theme: {
            preset: Aura
        }
    });

    app.component('Button', Button);
    app.component('InputText', InputText);
    app.component('Form', Form);
    app.component('Message', Message)
    app.component('FormField', FormField)
    app.component('Password', Password)
    app.component('Select', Select)

}