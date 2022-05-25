<template>
  <div>
    <NavBar></NavBar>
      <h1> PANTALLA DE HOME</h1>
      <BtnAtras></BtnAtras>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import BtnAtras from '@/components/BtnAtras.vue'

export default {
    name: 'Home',

    components:{
        'NavBar': NavBar,
        'BtnAtras': BtnAtras
    },
}
</script>