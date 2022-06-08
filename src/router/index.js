import Vue from 'vue'
import VueRouter from 'vue-router'
import { Store } from 'vuex'
import store from '../store'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/dashboard/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/usuario/registrar',
    name: 'Registrar',
    component: () => import(/* webpackChunkName: "registrar" */ '../views/Usuario/Registrar.vue'),
  },
  {
    path: '/usuario/listar',
    name: 'Listar',
    component: () => import(/* webpackChunkName: "listar" */ '../views/Usuario/Listar.vue'),
  },
  {
    path: '/usuario/editar/:Usuario',
    // path: '/usuario/editar/:Usuario/:Num',
    name: 'Editar',
    component: () => import(/* webpackChunkName: "editar" */ '../views/Usuario/Editar.vue'),
  }, 
  {  
    path: '/menu',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "monitoreogps" */ '../views/Menu.vue'),
  },
  // ************************************** NAVBAR DE LECTURACION *******************************************
  // ********************************************************************************************************
  {  
    path: '/tareas',
    name: 'Tareas',
    component: () => import(/* webpackChunkName: "monitoreogps" */ '../views/Lecturacion/Tareas.vue'),
  },
  {  
    path: '/lecturacion/monitoreogps',
    name: 'MonitoreoGPS',
    component: () => import(/* webpackChunkName: "monitoreogps" */ '../views/Lecturacion/MonitoreoGPS/Monitoreo.vue'),
  },
  {
    path: '/lecturacion/lecturaprocesada',
    name: 'LecturaProcesada',
    component: () => import(/* webpackChunkName: "pecturaprocesada" */ '../views/Lecturacion/LecturaProcesada/LecturaProcesada.vue'),
  },
  {
    path: '/lecturacion/clienteprocesado/:GeneracionFactura',
    name: 'ClienteProcesado',
    component: () => import(/* webpackChunkName: "clientependiente" */ '../views/Lecturacion/LecturaProcesada/ClienteProcesado.vue'),
  },
  {
    path: '/lecturacion/procesadocliente/:GeneracionFactura/:Cliente',
    name: 'ProcesadoCliente',
    component: () => import(/* webpackChunkName: "lecturacliente" */ '../views/Lecturacion/LecturaProcesada/ProcesadoCliente.vue'),
  },
  {
    path: '/lecturacion/lecturapendiente',
    name: 'LecturaPendiente',
    component: () => import(/* webpackChunkName: "lecturapendiente" */ '../views/Lecturacion/LecturaPendiente/LecturaPendiente.vue'),
  },
  {
    path: '/lecturacion/clientependiente/:GeneracionFactura',
    name: 'ClientePendiente',
    component: () => import(/* webpackChunkName: "clientependiente" */ '../views/Lecturacion/LecturaPendiente/ClientePendiente.vue'),
  },
  {
    path: '/lecturacion/lecturacliente/:GeneracionFactura/:Cliente',
    name: 'LecturaCliente',
    component: () => import(/* webpackChunkName: "lecturacliente" */ '../views/Lecturacion/LecturaPendiente/LecturaCliente.vue'),
  },
  {
    path: '/lecturacion/lecturainspeccion',
    name: 'LecturaInspeccion',
    component: () => import(/* webpackChunkName: "lecturainspeccion" */ '../views/Lecturacion/LecturaInspeccion/LecturaInspeccion.vue'),
  }, // ************************************* NAVBAR DE SINCRONIZACION *****************************************
     // ********************************************************************************************************
  {  
    path: '/sincronizacion/servidorcelular',
    name: 'ServidorCelular',
    component: () => import(/* webpackChunkName: "servidorcelular" */ '../views/Sincronizacion/ServidorCelular/ServidorCelular.vue'),
  },
  {
    path: '/sincronizacion/servidorinspeccion',
    name: 'ServidorInspeccion',
    component: () => import(/* webpackChunkName: "servidorinspeccion" */ '../views/Sincronizacion/ServidorInspeccion/ServidorInspeccion.vue'),
  },
  {
    path: '/sincronizacion/celularservidor',
    name: 'CelularServidor',
    component: () => import(/* webpackChunkName: "celularservidor" */ '../views/Sincronizacion/CelularServidor/CelularServidor.vue'),
  },
  {
    path: '/sincronizacion/enviarerrores',
    name: 'EnviarErrores',
    component: () => import(/* webpackChunkName: "enviarerrores" */ '../views/Sincronizacion/EnviarErrores/EnviarErrores.vue'),
  },
  {
    path: '/anormalidades',
    name: 'Anormalidades',
    component: () => import(/* webpackChunkName: "anormalidades" */ '../views/Anormalidades.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function existToken() {
  if(localStorage.getItem('token')) return 1; //localStorage.getItem('token');
  else return 0;
}

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !existToken()) next({ name: 'Login' })
  else next()
})

export default router
