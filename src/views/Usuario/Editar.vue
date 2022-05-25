<template>
    <div class="container">
        <br>
        <b-card-group deck>
            <b-card header="EDITAR USUARIO" header-tag="header">
              <div class="form-floating">
                      <input v-model="nombre" type="text" v-bind:class="[camposObligatorios.tcNombre ? 'form-control is-invalid' : inputValido]" id="nombre" placeholder="Nombre">
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

                <b-alert :show="dismissCountDown" :variant="mensaje.color" 
                    @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
                    {{ mensaje.texto }}
                </b-alert>

                <div class="d-grid gap-2">
                    <b-button @click="editarUsuario()" size="sm" block variant="warning"> Editar Usuario </b-button>
                    <router-link class="btn btn-danger btn-sm" to="/usuario/listar">Cancelar</router-link>
                </div>
            </b-card>
        </b-card-group>
        <br>
        <!-- {{id2}} -->
    </div>
</template>

<script>
  export default {
    data() {
      return {
        nombre: '',
        apellidos: '',
        login: '',
        correo: '',
        arrayUsuario: [],
        camposObligatorios: [],
        inputValido: 'form-control',
        inputInvalido: 'form-control is-invalid',

        // Alerta
        mensaje: {color: '', texto: ''},
        dismissSecs: 3,
        dismissCountDown: 0,

        // OBTIENE EL PARAMETRO DE LA RUTA
        id: '',
        // id2: ''
      }
    },
    created(){
        this.id = this.$route.params.Usuario;
        // this.id2 = this.$route.params.Num;
        this.listarUsuario(this.id);
    },
    methods: {
        cargarValores(){
          this.nombre    = this.arrayUsuario[0].Nombre;
          this.apellidos = this.arrayUsuario[0].Apellidos;
          this.login     = this.arrayUsuario[0].Login;
          this.correo    = this.arrayUsuario[0].Correo;
        },
        controlErrores(error){

          var array = [];

          if (error.response.status == 422) {
            array = error.response.data.errors
          }

          return array;

        },
        editarUsuario(){
            this.axios.put('/admin/updateUsuario', {
                'tcNombre'    : this.nombre,
                'tcApellidos' : this.apellidos,
                'tcLogin'     : this.login,
                'tcCorreo'    : this.correo,
                'tnUsuario'   : this.id,
            }).then(res => {
                console.log(res);
                this.limpiarCampos();
                //this.$router.push('/usuario/listar')
                this.mensaje.color = 'success';
                this.mensaje.texto = 'Guardado correctamente';
                this.showAlert();

            }).catch(e => {
                console.log(e.response);
                this.camposObligatorios = this.controlErrores(e);
                //this.alerta();
            })
            
        },
        limpiarCampos(){
          this.nombre     = '';
          this.apellidos  = '';
          this.login      = '';
          this.correo     = '';
          this.camposObligatorios = [];
        },
        listarUsuario(id){
            this.axios.post('/admin/showById?tnUsuario='+id)
              .then(res => {
                console.log(res);
                this.arrayUsuario = res.data.values;

                // CARGA LOS VALORES EN EL FORMULARIO
                this.cargarValores();

              })
              .catch(e => {
                // $this.arrayUsuario = [];
                console.log(e.response);
              })
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        },
    }
  }
</script>