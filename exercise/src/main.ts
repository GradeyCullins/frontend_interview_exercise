import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from "vuetify/labs/VDataTable"
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { VTable, VIcon, VProgressCircular, VTextField } from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'

const pinia = createPinia()
const vuetify = createVuetify({
  components: {
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
    VTable,
    VIcon,
    VProgressCircular,
    VTextField
  },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  }
})

const app = createApp(App)
app.use(vuetify)
app.use(pinia)
app.mount('#app')
