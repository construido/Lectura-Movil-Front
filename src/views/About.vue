<template>
  <div>
    <NavBar></NavBar>
      <h1> PANTALLA DE ABOUT</h1>
      <BtnAtras></BtnAtras>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import BtnAtras from '@/components/BtnAtras.vue'

export default {
    name: 'About',

    components:{
        'NavBar': NavBar,
        'BtnAtras': BtnAtras
    }
}
</script>