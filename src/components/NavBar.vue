<template> <!-- class="sticky-top" *EN LA CLASE DEL DIV* fixed="top" EN LA PARTE DEL B-NAVBAR// CLASES PARA PONER FIJO EL NAVBAR -->
    <div class="sticky-top" id="app">
        <b-navbar toggleable="md" type="dark" variant="primary">
            <b-container>
                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <b-navbar-brand class="mx-auto" href="#">LecturaMovil - {{EmpresaNombre}} </b-navbar-brand>

                <b-collapse is-nav id="nav_collapse">
                    <b-navbar-nav>
                        <b-nav-item :to="{name: 'Home'}" exact-active-class="active">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                            </svg> Inicio
                        </b-nav-item>
                        <b-nav-item :to="{name: 'About'}" exact-active-class="active">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                            </svg> Acerca de
                        </b-nav-item>
                        <!-- <b-nav-item :to="{name: 'Listar'}" exact-active-class="active">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/> 
                        </svg> Usuarios
                        </b-nav-item> -->
                        <b-nav-item @click="AbrirModal" exact-active-class="active">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                            </svg> Cambiar Contraseña
                        </b-nav-item>

                        <b-nav-item @click="Logout" exact-active-class="active"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                        </svg> Cerrar sesion
                        </b-nav-item>
                    </b-navbar-nav>
                </b-collapse>

            </b-container>
        </b-navbar>

        <b-modal centered id="modal-contrasena">
            <template #modal-header="{ close }">
                <b-button hidden variant="outline-danger" @click="close()">
                    Cerrar
                </b-button>

                <h5 class="text-black"> <b-icon icon="exclamation-triangle" scale="2" variant="warning mx-2"></b-icon> Cambiar Contraseña </h5>
            </template>

            <div class="form-floating">
                <input v-model="contrasena_actual" :type="type" v-bind:class="[camposObligatorios.Password_actual ? 'form-control is-invalid' : 'form-control']" class="form-control my-2" size="sm" id="contrasena_actual" placeholder="Contraseña Actual">
                <label for="contrasena">Contraseña Actual</label>
                <span v-if="camposObligatorios.Password_actual" v-text="camposObligatorios.Password_actual[0]" class="text-danger"></span>
            </div>
            <div class="form-floating">
                <input v-model="contrasena_nueva" :type="type" v-bind:class="[camposObligatorios.Password_nuevo ? 'form-control is-invalid' : 'form-control']" class="form-control" size="sm" id="contrasena_nueva" placeholder="Contraseña Nueva">
                <label for="contrasena">Contraseña Nueva</label>
                <span v-if="camposObligatorios.Password_nuevo" v-text="camposObligatorios.Password_nuevo[0]" class="text-danger"></span>
            </div>
            <div class="form-floating">
                <input v-model="repetir_contrasena" :type="type" v-bind:class="[camposObligatorios.Password_repetir ? 'form-control is-invalid' : 'form-control']" class="form-control my-2" size="sm" id="repetir_contrasena" placeholder="Repetir Contraseña">
                <label for="contrasena">Repetir Contraseña</label>
                <span v-if="camposObligatorios.Password_repetir" v-text="camposObligatorios.Password_repetir[0]" class="text-danger"></span>
            </div>

            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" @click="showPassword">
                <label class="form-check-label" for="flexSwitchCheckChecked"> {{ texto }} </label>
            </div>

            <template #modal-footer="{ close }">
                <b-button hidden block variant="outline-danger" @click="close()">
                    Cerrar
                </b-button>
                <b-button block variant="outline-danger" @click="CerrarModal">
                    Cerrar
                </b-button>
                <b-button block variant="outline-success" @click="CambiarContrasena">
                    Aceptar
                </b-button>
            </template>
        </b-modal>

        <b-modal centered id="modal-scoped-2">
            <template #modal-header="{ close }">
                <b-button hidden variant="outline-danger" @click="close()">
                    Cerrar
                </b-button>

                <h5 class="text-success"> <b-icon icon="check-square" scale="2" variant="success mx-2"></b-icon> Satisfactorio </h5>
            </template>

            <h5>Contraseña cambiada con éxito</h5>

            <template #modal-footer="{ ok }">
                <b-button block variant="outline-success" @click="ok()">
                    Aceptar
                </b-button>
            </template>
        </b-modal>

        <b-modal centered id="modal-scoped-3">
            <template #modal-header="{ close }">
                <b-button hidden variant="outline-danger" @click="close()">
                    Cerrar
                </b-button>

                <h5 class="text-danger"> <b-icon icon="x-octagon" scale="2" variant="danger mx-2"></b-icon> Error </h5>
            </template>

            <h5> {{mensajeBody}} </h5>

            <template #modal-footer="{ ok }">
                <b-button block variant="outline-success" @click="ok()">
                    Aceptar
                </b-button>
            </template>
        </b-modal>

    <br>
    </div>
</template>

<script>
// import {SessionExpirada} from './../Js/SessionExpirada'

export default {
    name: 'NavBar',

    data() {
        return {
            camposObligatorios: [],

            contrasena_actual : '',
            contrasena_nueva  : '',
            repetir_contrasena: '',

            mensajeBody  : '',
            type : 'password',
            texto: 'Mostrar Contraseña',

            show: false,
        }
    },

    methods: {
        AbrirModal(){
            this.$bvModal.show('modal-contrasena');
        },
        CerrarModal(){
            this.LimpiarCampos();
            this.$bvModal.hide('modal-contrasena');
        },
        LimpiarCampos(){
            this.contrasena_actual  = '';
            this.contrasena_nueva   = '';
            this.repetir_contrasena = '';
            this.camposObligatorios = [];
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
        CambiarContrasena(){
            this.show = true;
            if (this.contrasena_nueva == this.repetir_contrasena) {
                this.axios.put('/admin/updateContraseña',{
                    'Password_actual'  : this.contrasena_actual,
                    'Password_nuevo'   : this.contrasena_nueva,
                    'Password_repetir' : this.repetir_contrasena
                })
                .then(res => {
                    console.log(res.data);

                    if (res.data.status == 404) {
                        this.show = false;
                        this.mensajeBody = 'Contraseña actual incorrecta';
                        this.$bvModal.show('modal-scoped-3');
                    }else{
                        this.show = false;
                        this.LimpiarCampos();
                        this.$bvModal.hide('modal-contrasena');
                        this.$bvModal.show('modal-scoped-2');
                        this.Logout();
                    }
                }).catch(e => {
                    console.log(e.response);
                    this.camposObligatorios = this.controlErrores(e);
                    this.show = false;
                })
            }else{
                this.mensajeBody = 'Las contraseñas no coinciden';
                this.$bvModal.show('modal-scoped-3');
                this.show = false;
            }
        },
        Logout(){
            this.axios.get('/admin/logout')
            .then(res => {
                console.log(res.data);
                delete localStorage.token;
                localStorage.removeItem('token');
                localStorage.removeItem('NombreUsuario');
                localStorage.removeItem('ApellidoUsuario');
                localStorage.removeItem('EmpresaNombre');
                localStorage.removeItem('DataBaseAlias');
                localStorage.removeItem('Plomero');
                localStorage.removeItem('Empresa');
                this.$router.push('/');
            }).catch(e => {
                console.log(e.response);
                // if(e.response.status == 403){ // TODO
                //     SessionExpirada(e.response.status);
                //     this.$router.push('/');
                // }
            })
        },
        controlErrores(error){

            var array = [];

            if (error.response.status == 422) {
                array = error.response.data.errors
            }
            return array;
        },
    },

    computed: {
        EmpresaNombre(){
            return localStorage.getItem('EmpresaNombre');
        },
    }
}
</script>