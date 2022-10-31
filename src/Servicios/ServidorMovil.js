import BtnAtras from '@/components/BtnAtras.vue'
import NavBar from '@/components/NavBar.vue'
import { SessionExpirada, NombreUsuario, ApellidoUsuario, DataBaseAlias, Plomero } from './ControlErrores'
import moment from 'moment'

export default {
    name: 'ServidorCelular',

    components: {
        'NavBar': NavBar,
        'BtnAtras': BtnAtras
    },

    data() {
        return {
            show2: false,
            idPlanilla: [],
            arraryPlanillas : [],
            usuario: NombreUsuario() + ' ' + ApellidoUsuario(),

            // variables para el modal
            color : '',
            header : '',
            message : '',

            // datos de la number
            show: false,
            DataBaseAlias  : DataBaseAlias(),
            Plomero        : Plomero(),
            arrayFacturas: [],
            pagination : {
                'total' : 0,
                'current_page' : 0,
                'per_page' : 0,
                'last_page' : 0,
                'from' : 0,
                'to' : 0,
            },
            offset : 2,
        }
    },

    methods: {
        WMGet_Lecturas_Pendientes(){
            this.show2 = true
            this.axios.post('admin/WMGet_Lecturas_Pendientes')
            .then( res => {
                this.arraryPlanillas = res.data
                console.log(res.data)
                this.show2 = false
            })
            .catch( err => {
                console.log(err.response)
                this.show2 = false
            })
        },
        WMSincronizacionBDListDemo(){
            this.show2 = true
            this.axios.post('admin/WMSincronizacionBDListDemo', {
                'GeneracionFactura' : this.idPlanilla
            })
            .then( res => {
                console.log(res.data)

                if(res.data.status == 1) {
                    this.listarFacturas()
                    this.color   = 'success'
                    this.header  = res.data.message
                    this.message = res.data.values
                }
                else{
                    this.color   = 'danger'
                    this.header  = res.data.message
                    this.message = res.data.values
                }

                this.show2 = false
                this.$bvModal.show('modal-sincronizacion');
            })
            .catch( err => {
                console.log(err.response)
                this.show2 = false
            })
        },
        formatoFecha($data){
            return moment().format("DD-MM-YYYY", $data);
        },

        // DATOS DE LA NUBE
        cambiarPagina(page){
            //Actualiza la página actual
            this.pagination.current_page = page;
            this.listarFacturas(page);
        },
        listarFacturas(page){
            this.axios.post('/admin/listarPlanillaDeLecturasPendientes?page='+page+'&DataBaseAlias='+this.DataBaseAlias+'&Plomero='+this.Plomero)
                .then(res => {
                    if (res.data.status == 403){
                        SessionExpirada();
                    }else{
                        this.pagination = res.data.values.pagination;
                        this.arrayFacturas = res.data.values.laGeneracionFactura.data;
                    }
                })
                .catch(e => {
                    this.arrayFacturas = [];
                })
        },
    },

    created(){
        this.listarFacturas()
        this.WMGet_Lecturas_Pendientes()
    },

    computed: {
        isActived: function(){
            return this.pagination.current_page;
        },
        //     //Calcula los elementos de la paginación
        pagesNumber: function() {
            if(!this.pagination.to) {
                return [];
            }
            var from = this.pagination.current_page - this.offset; 
            if(from < 1) {
                from = 1;
            }

            var to = from + (this.offset * 2); 
            if(to >= this.pagination.last_page){
                to = this.pagination.last_page;
            }  
            var pagesArray = [];
            while(from <= to) {
                pagesArray.push(from);
                from++;
            }
            return pagesArray;             
        }
    },
}