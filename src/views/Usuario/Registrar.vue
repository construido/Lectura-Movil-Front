<template>
    <div class="container">
        <br>
        <b-card-group deck>
            <b-card header="REGISTRO DE USUARIO" header-tag="header" footer="LOS CAMPOS SON OBLIGATORIOS">
                <div class="form-floating">
                      <input v-model="nombre" type="text" v-bind:class="[camposObligatorios.tcNombre ? 'form-control is-invalid' : 'form-control']" id="nombre" placeholder="Nombre">
                      <label for="nombre">Nombre</label>
                      <span v-if="camposObligatorios.tcNombre" v-text="camposObligatorios.tcNombre[0]" class="text-danger"></span>
                </div><br>
                <div class="form-floating">
                      <input v-model="apellidos" type="text" :class="[camposObligatorios.tcApellidos ? 'form-control is-invalid' : 'form-control']" id="apellidos" placeholder="Apellidos">
                      <label for="apellidos">Apellidos</label>
                      <span v-if="camposObligatorios.tcApellidos" v-text="camposObligatorios.tcApellidos[0]" class="text-danger"></span>
                </div><br>
                <div class="form-floating">
                      <input v-model="correo" type="text" :class="[camposObligatorios.tcCorreo ? 'form-control is-invalid' : 'form-control']" id="correo" placeholder="Correo">
                      <label for="correo">Correo</label>
                      <span v-if="camposObligatorios.tcCorreo" v-text="camposObligatorios.tcCorreo[0]" class="text-danger"></span>
                </div><br>
                <div class="form-floating">
                      <input v-model="login" type="text" :class="[camposObligatorios.tcLogin ? 'form-control is-invalid' : 'form-control']" id="login" placeholder="Login">
                      <label for="login">Login</label>
                      <span v-if="camposObligatorios.tcLogin" v-text="camposObligatorios.tcLogin[0]" class="text-danger"></span>
                </div><br>
                <div class="form-floating">
                      <input v-model="password" :type="type" :class="[camposObligatorios.tcPassword ? 'form-control is-invalid' : 'form-control']" id="contrasena" placeholder="Contraseña">
                      <label for="contrasena">Contraseña</label>
                      <span v-if="camposObligatorios.tcPassword" v-text="camposObligatorios.tcPassword[0]" class="text-danger"></span>
                </div><br>
                <div class="form-floating">
                      <input v-model="confirmarPassword" :type="type" :class="[camposObligatorios.tcConfirmarPassword ? 'form-control is-invalid' : 'form-control']" id="confirmarContrasena" placeholder="Confirmar Contraseña">
                      <label for="confirmarContrasena">Confirmar Contraseña</label>
                      <span v-if="camposObligatorios.tcConfirmarPassword" v-text="camposObligatorios.tcConfirmarPassword[0]" class="text-danger"></span>
                </div>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" @click="showPassword">
                  <label class="form-check-label" for="flexSwitchCheckChecked"> {{ texto }} </label>
                </div>
                <br>
                <b-alert :show="dismissCountDown" :variant="mensaje.color" 
                      @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
                      {{ mensaje.texto }}
                </b-alert>

                <div class="d-grid gap-2">
                  <b-button @click="guardarUsuario()" variant="success"> Registrar Usuario </b-button>
                    <router-link class="btn btn-danger" to="/usuario/listar">Cancelar</router-link>
                </div>

            </b-card><br>
        </b-card-group>
        
    </div>
</template>

<script>
  export default {
    data() {
      return {
        nombre: '',
        apellidos: '',
        login: '',
        password: '',
        confirmarPassword: '',
        correo: '',
        camposObligatorios: [],
        inputValido: 'form-control',
        inputInvalido: 'form-control is-invalid',
        // form-control is-valid para input valido ** form-control is-invalid para input invalido

        // Alerta
        mensaje: {color: '', texto: ''},

        // Paginación
        dismissSecs: 3,
        dismissCountDown: 0,

        // Mostrar y Ocultar contraseña
        type: 'password',
        texto: 'Mostrar Contraseña'
      }
    },
    methods: {
        showPassword() {
          if(this.type == 'password') {
              this.type = 'text'
              this.texto = 'Ocultar Contraseña'
          } else {
              this.type = 'password'
              this.texto = 'Mostrar Contraseña'
          }
        },
        controlErrores(error){

          var array = [];

          if (error.response.status == 422) {
            array = error.response.data.errors
          }

          return array;

        },
        limpiarCampos(){
          this.nombre     = '';
          this.apellidos  = '';
          this.login      = '';
          this.password   = '';
          this.confirmarPassword = '';
          this.correo     = '';
          this.camposObligatorios = [];
        },
        guardarUsuario(){
          if (this.confirmarPassword === this.password) {
              this.axios.post('/saveUsuario', {
                  'tcNombre'    : this.nombre,
                  'tcApellidos' : this.apellidos,
                  'tcLogin'     : this.login,
                  'tcPassword'  : this.password,
                  'tcCorreo'    : this.correo,
                  'tcConfirmarPassword' : this.confirmarPassword,
              }).then(res => {
                  console.log(res.data);
                  //this.$router.push('/usuario/listar')
                  this.limpiarCampos();
                  this.mensaje.color = 'success';
                  this.mensaje.texto = 'Guardado correctamente';
                  this.showAlert();

              }).catch(e => {
                  console.log(e.response);
                  this.camposObligatorios = this.controlErrores(e);
              })
          }else{
              this.mensaje.color = 'danger';
              this.mensaje.texto = 'Las contraseñas deben conincidir!';
              this.showAlert();
          }
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        },
    },
  }
</script>