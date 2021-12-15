import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'

import '@/stylesheets/tailwind.sass'

createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')
