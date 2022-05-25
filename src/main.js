import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(require('vue-moment'));

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min'


import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
window.axios = axios

axios.defaults.baseURL = 'http://192.168.100.95:8000/api';
// axios.defaults.baseURL = 'https://servicio.lecturamovil.syscoop.com.bo/api';
// axios.defaults.baseURL = 'https://serviciolecturamovil.lpf.app/api';

var token = localStorage.getItem('token');
// var token = localStorage.token;

if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}else{
  router.push('/');
}

Vue.config.productionTip = true // Se cambio a true para probar si el front levantaba en produccion en produccion

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')