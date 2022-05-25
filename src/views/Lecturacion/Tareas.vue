<template>
    <div>
        <NavBar></NavBar>

        <div class="container">
            <b-card-group deck>
                <b-card header="TAREAS" header-tag="header" :footer="fecha" footer-text-variant="center">
                    
                    <div class="d-grid gap-2">
                        <router-link class="btn btn-success btn-lg" :to="{name: 'LecturaPendiente'}"> LECTURAS PENDIENTES </router-link>
                        <router-link class="btn btn-success btn-lg" :to="{name: 'LecturaProcesada'}"> LECTURAS PROCESADAS </router-link>
                        <router-link class="btn btn-success btn-lg" :to="{name: 'ServidorCelular'}"> OTROS </router-link>
                    </div>

                </b-card>
            </b-card-group>
        </div>

        <BtnAtras></BtnAtras>
    </div>
</template>

<script>
import moment from 'moment';
// import Card from '@/components/Card.vue'
import NavBar from '@/components/NavBar.vue'
import BtnAtras from '@/components/BtnAtras.vue'

export default {
    name: 'LecturaInspeccion',

    data() {
        return {
            fecha:'',
        }
    },

    components:{
        'NavBar': NavBar,
        'BtnAtras': BtnAtras,
        // 'Card': Card
    },

    methods:{
      fechaActual(){
          this.fecha = moment().format("DD/MM/YYYY");
      },

    },

    created(){
        this.fechaActual();
    },
}
</script>