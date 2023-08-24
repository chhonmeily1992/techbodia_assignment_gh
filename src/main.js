import Vue, { createApp } from '@vue/compat'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './style.css'
import App from './App.vue'

Vue.use(BootstrapVue)

createApp(App).mount('#app')
