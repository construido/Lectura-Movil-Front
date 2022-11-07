<template>
    <div>
        <NavBar></NavBar>

        <div class="container my-2">
            <b-card-group deck>
                <b-card header="MENÚ MÓVIL" header-tag="header" :footer="fecha" footer-text-variant="center">
                    
                    <div class="d-grid gap-2">
                        <router-link class="btn btn-success btn-lg" :to="{name: 'Tareas'}"> LECTURACIÓN </router-link>
                        <router-link class="btn btn-success btn-lg" :to="{name: 'LecturaInspeccion'}"> INSPECCIÓN </router-link>
                        <router-link class="btn btn-success btn-lg" :to="{name: 'Sincronizacion'}"> SINCRONIZACIÓN </router-link>
                        <router-link class="btn btn-success btn-lg" :to="{name: 'MovilServidor'}"> EN SERVIDOR </router-link>
                        <router-link class="btn btn-success btn-lg" :to="{name: 'Anormalidades'}"> ANORMALIDADES DE MEDIDOR </router-link>
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
    name: 'Menu',

    data() {
      return {

        fecha:'',

      }
    },

     components:{
        'NavBar'  : NavBar,
        'BtnAtras': BtnAtras,
        // 'Card'    : Card,
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