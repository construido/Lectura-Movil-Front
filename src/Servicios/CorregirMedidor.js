import NavBar from '@/components/NavBar.vue'
import {DataBaseAlias} from './ControlErrores'

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
            DataBaseAlias: DataBaseAlias(),

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
                {MarcaMedidor: 1, NombreMarcaMedidor: 'LAO'},
                {MarcaMedidor: 2, NombreMarcaMedidor: 'ISI'},
                {MarcaMedidor: 3, NombreMarcaMedidor: 'EXT'}
            ]
        }
    },

    methods: {
        marcaMedidor(){
            this.axios.post('/admin/llenarSelectMarca', {
                'DataBaseAlias'    : this.DataBaseAlias
            }).then(res => {
                console.log(res.data)
                this.arrayMarca = res.data.values
            }).catch(e => {
                console.error(e.response)
            })
        }
    },

    created() {
        this.marcaMedidor()
    }
}