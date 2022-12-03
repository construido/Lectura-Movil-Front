<template>
    <div>
        <NavBar></NavBar>

        <div class="container my-2 mb-5 pb-5">
            <div class="card">
                <div class="card-header">
                    <div class="col-xl-6">
                        <div class="text-center">
                            <h5> <b> Corregir Medidor / Lectura </b> </h5>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <b> Código Fijo: </b> 99999 <br>
                    <b> Código Ubicacion: </b> 9999999 <br>
                    <b> Nombre: </b> Nombre Prueba <br><br>
                    <div class="form-floating">
                        <select class="form-control" v-model="tipo">
                            <option selected disabled value="0"> Seleccione un tipo </option>
                            <option  v-for="item in arrayTipo" :key="item.value" :value="item.value"> {{item.text}} </option>
                        </select>
                        <label for="tipo">Tipo</label>
                    </div>
                    <div class="form-floating my-2">
                        <select class="form-control" v-model="estado">
                            <option selected disabled value="0"> Seleccione un estado </option>
                            <option  v-for="item in arrayEstado" :key="item.value" :value="item.value"> {{item.text}} </option>
                        </select>
                        <label for="tipo">Estado</label>
                    </div>
                    <div class="form-floating">
                        <select class="form-control" v-model="marca">
                            <option selected disabled value="0"> Seleccione una marca </option>
                            <option  v-for="item in arrayMarca" :key="item.value" :value="item.value"> {{item.text}} </option>
                        </select>
                        <label for="tipo">Marca</label>
                    </div>
                    <div class="form-floating my-2">
                        <input v-model="serie" type="text" class="form-control" placeholder="Serie">
                        <label for="serie">Serie</label>
                    </div>
                    <div class="form-floating">
                        <input v-model="numero" type="text" class="form-control" placeholder="Numero">
                        <label for="numero">Numero</label>
                    </div>
                    <div class="form-floating mt-2">
                        <input v-model="lec_act" type="text" class="form-control" placeholder="Lectura Actual">
                        <label for="lec_act">Lectura Actual</label>
                    </div>
                </div>
            </div>
        </div><br>

        <footer class="bg-light fixed-bottom">
            <div class="text-center p-3">
                <div class="d-grid gap-2">
                    <b-button variant="success"> Guardar </b-button>
                    <b-button @click="$router.go(-1)" variant="danger"> Volver </b-button>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
    name: 'LecturaInspeccion',

    components:{
        'NavBar': NavBar
    },

    data() {
        return {
            serie: '',
            numero: '',
            lec_act: '',

            tipo: 0,
            arrayTipo: [
                {value: 1, text: 'Nuevo'},
                {value: 2, text: 'El Mismo'},
                {value: 3, text: 'Distinto'},
                {value: 4, text: 'Otro'}
            ],

            estado: 0,
            arrayEstado: [
                {value: 1, text: 'Legible'},
                {value: 2, text: 'Destruido'},
                {value: 3, text: 'Sin Medidor'}
            ],

            marca: 0,
            arrayMarca: [
                {value: 1, text: 'LAO'},
                {value: 2, text: 'ISI'},
                {value: 3, text: 'EXT'}
            ]
        }
    }
}
</script>