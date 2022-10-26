import BtnAtras from '@/components/BtnAtras.vue'
import NavBar from '@/components/NavBar.vue'
import { NombreUsuario, ApellidoUsuario } from './ControlErrores'
import moment from 'moment'

export default {
    name: 'ServidorCelular',

    components: {
        'NavBar': NavBar,
        'BtnAtras': BtnAtras
    },

    data() {
        return {
            show: false,
            idPlanilla: [],
            arraryPlanillas : [],
            usuario: NombreUsuario() + ' ' + ApellidoUsuario(),
        }
    },

    methods: {
        WMGet_Lecturas_Pendientes(){
            this.show = true
            this.axios.post('admin/WMGet_Lecturas_Pendientes')
            .then( res => {
                this.arraryPlanillas = res.data
                console.log(res.data)
                this.show = false
            })
            .catch( err => {
                console.log(err.response)
                this.show = false
            })
        },
        WMSincronizacionBDListDemo(){
            this.show = true
            this.axios.post('admin/WMSincronizacionBDListDemo', {
                'GeneracionFactura' : this.idPlanilla
            })
            .then( res => {
                //this.arraryPlanillas = res.data
                console.log(res.data)
                this.show = false
            })
            .catch( err => {
                console.log(err.response)
                this.show = false
            })
        },
        formatoFecha($data){
            return moment().format("DD-MM-YYYY", $data);
        }
    },

    created(){
        this.WMGet_Lecturas_Pendientes();
    },
}