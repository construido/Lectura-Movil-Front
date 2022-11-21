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
            show: false,
            active: true,
            idPlanilla: [],
            arraryPlanillas : [],
            usuario: NombreUsuario() + ' ' + ApellidoUsuario(),

            // variables para el modal
            color : '',
            header : '',
            message : '',
            showbtn : true,

            // datos de la nube
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
        click(event){
            this.active = event
        },
        showModal(color, header, message, status){
            if(status == 1){
                this.showbtn = false
                this.color   = color
                this.header  = header
                this.message = message
            }else if(status == 0){
                this.showbtn = false
                this.color   = color
                this.header  = header
                this.message = message
            }else{
                this.showbtn = true
                this.color   = 'success'
                this.header  = 'INFORMACIÓN'
                this.message = 'Desea continuar..?'
            }

            this.$bvModal.show('modal-sincronizacion');
        },
        WMGet_Lecturas_Pendientes(){
            this.show = true
            this.axios.post('admin/WMGet_Lecturas_Pendientes')
            .then( res => {
                this.arraryPlanillas = res.data
                this.show = false
            })
            .catch( err => {
                console.log(err.response)
                this.show = false
            })
        },
        WMSincronizarCaS(){
            this.show = true
            this.$bvModal.hide('modal-sincronizacion')
            this.axios.post('admin/WMSincronizarCaS', {
                'Plomero' : this.Plomero,
                'DataBaseAlias' : this.DataBaseAlias
            })
            .then( res => {
                console.log(res.data)
                if(res.data.status == 1) {
                    this.listarFacturas()
                    this.showModal('success', res.data.message, res.data.values, res.data.status)
                }
                else{
                    this.showModal('danger', res.data.message, res.data.values, res.data.status)
                }

                this.show = false
                this.$bvModal.show('modal-sincronizacion');
            })
            .catch( err => {
                console.log(err.response)
                this.show = false
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
            this.show = true
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
            this.show = false
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