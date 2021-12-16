import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'

import '@/stylesheets/tailwind.sass'
import '@/stylesheets/app.sass'

axios.interceptors.request.use((config) => {
	config.headers['X-Auth-Token'] = process.env.VUE_APP_FOOTBALL_DATA_TOKEN

	return config
})

const app = createApp(App)

app.use(store)
app.use(router)
app.use(VueAxios, axios)

app.mount('#app')
