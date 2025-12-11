import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import App from '@/App.vue'
import { theme } from '@/sytle/theme'

const pinia = createPinia().use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(pinia)
    .use(PrimeVue, {
        theme: {
            preset: theme
        }
    })
    .mount('#app')
