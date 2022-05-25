<template>
    <div class="container" id="container">

        <div class="text-center">
          <img class="img-fluid" src="../../public/imagenes/lm-4.png">
          <!-- <b-icon v-if="!onLine" icon="wifi-off" aria-hidden="true" scale="2"></b-icon>
          <b-icon v-else icon="wifi" aria-hidden="true" scale="2"></b-icon> -->
        </div>

        <div class="card">
            <div class="card-header">
                <div class="col-xl-12">
                    <div class="text-center">
                        <h6>LECTURA MÓVIL</h6>
                    </div>
                </div>
            </div>
            <b-overlay :show="show" class="d-inline-block">
                <div class="card-body">
                    <div class="form-floating">
                      <input v-model="login" v-bind:class="[camposObligatorios.Login ? 'form-control is-invalid' : 'form-control']" type="text" class="form-control" id="login" placeholder="Login">
                      <label for="login">Login</label>
                      <span v-if="camposObligatorios.Login" v-text="camposObligatorios.Login[0]" class="text-danger"></span>
                    </div><br>
                    <div class="form-floating">
                        <input v-model="password" v-bind:class="[camposObligatorios.password ? 'form-control is-invalid' : 'form-control']" :type="type" class="form-control" size="sm" id="contrasena" placeholder="Contraseña">
                        <label for="contrasena">Contraseña</label>
                        <span v-if="camposObligatorios.password" v-text="camposObligatorios.password[0]" class="text-danger"></span>
                    </div>

                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" @click="showPassword">
                      <label class="form-check-label" for="flexSwitchCheckChecked"> {{ texto }} </label>
                    </div>
                    <br>
                    <div class="d-grid gap-2">
                        <b-button @click="Login()" :variant="color">INGRESAR
                          <!-- <b-icon v-if="!onLine" icon="wifi-off" aria-hidden="true"></b-icon>
                          <b-icon v-else icon="wifi" aria-hidden="true"></b-icon> -->
                        </b-button>
                        <b-button @click="$router.go(0)" variant="primary"> ACTUALIZAR </b-button>
                        <a href="https://api.whatsapp.com/send?phone=59168921251"> Contáctenos </a>
                    </div>
                </div>
            </b-overlay>
        </div>

        <b-modal id="modal-scoped">
            <template #modal-header="{ close }">
                <b-button hidden variant="outline-danger" @click="close()">
                    Cerrar
                </b-button>

                <h5 class="text-danger"> <b-icon icon="x-octagon" scale="2" variant="danger mx-2"></b-icon> Error - {{mensajeHeader}} </h5>
            </template>

            <h5>{{mensajeBody}}</h5>

            <template #modal-footer="{ ok }">
                <b-button block variant="outline-success" @click="ok()">
                    Aceptar
                </b-button>
            </template>
        </b-modal>

    </div>
</template>

<script>
  import moment from 'moment';

  export default {
    data() {
      return {

        login: '',
        password:'',
        camposObligatorios: [],
        onLine: true,
        color: 'success',

        // Alert
        show: false,
        mensajeHeader : '',
        mensajeBody : '',

        fecha:'',
        imageEnviar:[],

        // Mostrar contraseña
        type: 'password',
        texto: 'Mostrar Contraseña',
      }
    },
    methods:{
      fullScreen() {
        if(navigator.onLine) {
            // el navegador está conectado a la red
            // alert('el navegador está conectado a la red');
            this.onLine = true;
            this.color = 'success';
        } else {
            // el navegador NO está conectado a la red
            // alert('el navegador NO está conectado a la red');
            this.onLine = false;
            this.color = 'danger';
        }
      },
      controlErrores(error){

          var array = [];

          if (error.response.status == 422) {
              array = error.response.data.errors
          }else{
            if (error.response.status == 401){
                this.mensajeHeader = 'Credenciales inválidos';
                this.mensajeBody = 'Intente nuevamente';
                this.$bvModal.show('modal-scoped');
            }else{
              if (error.response.status == 403) {
                this.mensajeHeader = 'Cuenta suspendida';
                this.mensajeBody = 'Contactar al Administrador';
                this.$bvModal.show('modal-scoped');
              }
            }
          }
          return array;
      },
      Login(){
        this.show = true;
        this.axios.post('/login', {
            'Login'    : this.login,
            'password' : this.password
        }).then(res => {
            this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token.token;
            localStorage.setItem('token', res.data.token.token);
            localStorage.setItem('NombreUsuario', res.data.data.Nombre);
            localStorage.setItem('ApellidoUsuario', res.data.data.Apellidos);
            localStorage.setItem('EmpresaNombre', res.data.data.EmpresaNombre);
            localStorage.setItem('DataBaseAlias', res.data.data.DataBaseAlias);
            localStorage.setItem('Plomero', res.data.data.Plomero);
            localStorage.setItem('Empresa', res.data.data.Empresa);
            this.show = false;
            this.$router.push('/menu');

        }).catch(e => {
            console.log(e.response);
            this.camposObligatorios = this.controlErrores(e);
            this.show = false;
        })
      },
      fechaActual(){
          this.fecha = moment().format("DD/MM/YYYY");
      },
      showPassword() {
        if(this.type == 'password') {
            this.type = 'text'
            this.texto = 'Ocultar Contraseña'
        } else {
            this.type = 'password'
            this.texto = 'Mostrar Contraseña'
        }
      },
    },

    created(){
        this.fechaActual();
        // this.fullScreen();
    },
  }
</script>