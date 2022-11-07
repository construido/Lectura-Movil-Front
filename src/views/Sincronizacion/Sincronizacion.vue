<template>
    <div>
        <NavBar></NavBar>
            <div class="container my-2">
                <b-card-group deck>
                    <b-card header="SINCRONIZACIÓN" header-tag="header" footer-text-variant="center">
                        
                        <div class="d-grid gap-2">
                            <router-link class="btn btn-success btn-lg" :to="{name: 'ServidorMovil'}"> SERVIDOR A MÓVIL </router-link>
                            <router-link class="btn btn-success btn-lg" :to="{name: 'MovilServidor'}"> MÓVIL A SERVIDOR </router-link>
                            <router-link class="btn btn-success btn-lg" :to="{name: 'ServidorInspeccion'}"> INSPECCIÓN </router-link>
                            <router-link class="btn btn-success btn-lg" :to="{name: 'EnviarErrores'}"> ENVIAR ERRORES </router-link>
                        </div>

                    </b-card>
                </b-card-group>
            </div>
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
    }

}

</script>