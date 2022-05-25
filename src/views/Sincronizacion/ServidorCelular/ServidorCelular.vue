<template>
    <div>
        <NavBar></NavBar>
        <h1> PANTALLA DE SERVIDOR CELULAR</h1>
        <BtnAtras></BtnAtras>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import BtnAtras from '@/components/BtnAtras.vue'

export default {
    name: 'ServidorCelular',

    components: {
        'NavBar': NavBar,
        'BtnAtras': BtnAtras
    }
}
</script>