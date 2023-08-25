import Vue, { createApp } from '@vue/compat'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './style.css'
import App from './App.vue'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
createApp(App).mount('#app')
