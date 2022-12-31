<template>
    <div>
        <NavBar></NavBar>
            <div class="container my-2">
                <b-card-group deck>
                    <b-card header="SINCRONIZACIÓN" header-tag="header" footer-text-variant="center">
                        
                        <div class="d-grid gap-2">
                            <router-link class="btn btn-success btn-lg" :to="{name: 'ServidorMovil'}"> SERVIDOR A MÓVIL </router-link>
                            <router-link class="btn btn-success btn-lg" :to="{name: 'MovilServidor'}"> MÓVIL A SERVIDOR </router-link>
                            <!-- <router-link class="btn btn-success btn-lg" :to="{name: 'RecursoGeneral'}"> SINCRONIZAR RECURSO GENERAL </router-link> -->
                            <b-button class="btn btn-success btn-lg" @click="abrirModal()"> SINCRONIZAR RECURSO GENERAL </b-button>
                            <router-link class="btn btn-success btn-lg" :to="{name: 'EnviarErrores'}"> ENVIAR ERRORES </router-link>
                        </div>

                    </b-card>
                </b-card-group>
            </div>

            <b-modal centered id="modal-sincronizacion">
                <template #modal-header="{ close }">
                    <b-button hidden variant="outline-danger" @click="close()">
                        Cerrar
                    </b-button>

                    <h5 class="text-success"> Información </h5>
                </template>

                <b-overlay :show="show" class="d-inline-block">
                    <h5 class="text-black"> Está seguro de Sincronizar los recursos generales ? </h5>
                </b-overlay>

                <template #modal-footer="{ cancel }">
                    <b-button block variant="outline-success" class="mx-2" @click="WMSincronizacionDatosGeneralesBDList()">
                        SÍ
                    </b-button>
                    <b-button block variant="outline-danger" @click="cancel()">
                        NO
                    </b-button>
                </template>
            </b-modal>

            <b-modal centered id="modal-mensaje">
                <template #modal-header="{ close }">
                    <b-button hidden variant="outline-danger" @click="close()">
                        Cerrar
                    </b-button>

                    <h5 class="text-success"> {{header}} </h5>
                </template>

                <b-overlay :show="show" class="d-inline-block">
                    <h5 class="text-black"> {{ message }} </h5>
                </b-overlay>
                
                <template #modal-footer="{ cancel }">
                    <b-button block variant="outline-danger" @click="cancel()">
                        Aceptar
                    </b-button>
                </template>
            </b-modal>
        <BtnAtras></BtnAtras>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import BtnAtras from '@/components/BtnAtras.vue'

export default {
    name: 'Sincronizacion',

    components: {
        'NavBar' : NavBar,
        'BtnAtras' : BtnAtras,
    },

    data(){
        return {
            show: false,
            header:'',
            message: '',
        }
    },

    methods: {
        abrirModal(){
            this.$bvModal.show('modal-sincronizacion')
        },

        WMSincronizacionDatosGeneralesBDList(){
            this.show = true
            this.axios.post('admin/WMSincronizacionDatosGeneralesBDList')
            .then( res => {
                console.log(res.data)
                this.$bvModal.hide('modal-sincronizacion')
                this.header = res.data.message
                this.message = res.data.values
                this.$bvModal.show('modal-mensaje')
                this.show = false
            })
            .catch( err => {
                console.log(err.response)
                this.show = false
            })
        },
    }
}

</script>