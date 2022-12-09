import Vue from 'vue'
import VueRouter from 'vue-router'
// import { Store } from 'vuex'
// import store from '../store'
import Login from '../views/Login.vue'
import moment from 'moment';

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
    path: '/lecturacion/lecturarplanillas',
    name: 'LecturarPlanillas',
    component: () => import(/* webpackChunkName: "lecturapendiente" */ '../views/Lecturacion/Lecturar/LecturarPlanillas.vue'),
  },
  {
    path: '/lecturacion/clientesalecturar/:GeneracionFactura',
    name: 'ClientesALecturar',
    component: () => import(/* webpackChunkName: "clientependiente" */ '../views/Lecturacion/Lecturar/ClientesALecturar.vue'),
  },
  {
    path: '/lecturacion/lecturacliente/:GeneracionFactura/:Cliente',
    name: 'LecturaCliente',
    component: () => import(/* webpackChunkName: "lecturacliente" */ '../views/Lecturacion/Lecturar/LecturaCliente.vue'),
  },
  {
    path: '/lecturacion/lecturainspeccion',
    name: 'LecturaInspeccion',
    component: () => import(/* webpackChunkName: "lecturainspeccion" */ '../views/Lecturacion/LecturaInspeccion/LecturaInspeccion.vue'),
  },
  {
    path: '/lecturacion/planillaspendientes',
    name: 'PlanillasPendientes',
    component: () => import(/* webpackChunkName: "lecturainspeccion" */ '../views/Lecturacion/LecturaPendiente/PlanillasPendientes.vue'),
  }, 
    // ************************************* NAVBAR DE SINCRONIZACION *****************************************
    // ********************************************************************************************************
  {
    path: '/sincronizacion',
    name: 'Sincronizacion',
    component: () => import(/* webpackChunkName: "servidorcelular" */ '../views/Sincronizacion/Sincronizacion.vue'),
  },
  {  
    path: '/sincronizacion/servidormovil',
    name: 'ServidorMovil',
    component: () => import(/* webpackChunkName: "servidormovil" */ '../views/Sincronizacion/ServidorMovil/ServidorMovil.vue'),
  },
  {
    path: '/sincronizacion/servidorinspeccion',
    name: 'ServidorInspeccion',
    component: () => import(/* webpackChunkName: "servidorinspeccion" */ '../views/Sincronizacion/ServidorInspeccion/ServidorInspeccion.vue'),
  },
  {
    path: '/sincronizacion/movilservidor',
    name: 'MovilServidor',
    component: () => import(/* webpackChunkName: "movilservidor" */ '../views/Sincronizacion/MovilServidor/MovilServidor.vue'),
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
  {  
    path: '/medidor',
    name: 'Medidor',
    component: () => import(/* webpackChunkName: "monitoreogps" */ '../views/Lecturacion/CorregirMedidor.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function existToken() {
  try {
    if (localStorage.getItem('token')){

      var token     = localStorage.getItem('token')
      var base64Url = token.split('.')[1];
      var base64    = base64Url.replace('-', '+').replace('_', '/');
      var payload   = JSON.parse(window.atob(base64))
      var Fecha_Expiracion = moment(payload.exp * 1000)
      var Fecha_Actual     = new Date();

      if(Fecha_Expiracion._d > Fecha_Actual) return 1; // TODO: Token válido
      else return 0; // TODO: Token expirado

    }else return 0; // TODO: No existe Token
    
  } catch (error) {
    return 0; // TODO: Error de Token
  }
};

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !existToken()) next({ name: 'Login' })
  else next()
})

export default router
