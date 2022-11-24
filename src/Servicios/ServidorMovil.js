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

            // paginación .NET
            fin : 0,
            perPage : 10,
            dataPage : [],
            pageAction : 1,
            numbPage : 0,

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
        // Paginación .NET
        totalPaginas(){
            //return Math.ceil(this.arraryPlanillas.length / this.perPage)
            this.fin = Math.ceil(this.arraryPlanillas.length / this.perPage)
            if(!this.fin) {
                return [];
            }
            
            var from = this.numbPage - this.offset
            if(from < 1) {
                from = 1;
            }
            
            var to = from + (this.offset * 2); 
            if(to >= this.fin){
                to = this.fin;
            }  
            var pagesArray = [];
            while(from <= to) {
                pagesArray.push(from);
                from++;
            }
            
            return pagesArray;
        },
        getDataPage(pageNum){
            let a = Math.ceil(this.arraryPlanillas.length / this.perPage)
            if(pageNum <= a){
                this.numbPage = pageNum
                this.dataPage = []
                this.pageAction = pageNum
                let ini = (pageNum * this.perPage) - this.perPage
                let fin = (pageNum * this.perPage)
                this.dataPage = this.arraryPlanillas.slice(ini, fin)
            }
        },
        getPreviousPage(){
            if(this.pageAction > 1){
                this.pageAction--
            }
            this.getDataPage(this.pageAction)
        },
        getNextPage(){
            if(this.pageAction < this.totalPaginas()){
                this.pageAction++
            }
            this.getDataPage(this.pageAction)
        },
        isActive(pageNum){
            return pageNum == this.pageAction ? 'active' : ''
        },
        // Paginación .NET

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
            }else if(this.idPlanilla.length > 0){
                this.showbtn = true
                this.color   = 'success'
                this.header  = 'INFORMACIÓN'
                this.message = 'Los datos del móvil serán borrados. Desea continuar..?'
            }else{
                this.showbtn = false
                this.color   = 'danger'
                this.header  = 'ERROR'
                this.message = 'Debe Seleccionar una plantilla...'
            }

            this.$bvModal.show('modal-sincronizacion');
        },
        WMGet_Lecturas_Pendientes(){
            this.show = true
            this.axios.post('admin/WMGet_Lecturas_Pendientes')
            .then( res => {
                this.arraryPlanillas = res.data
                this.getDataPage(1)
            })
            .catch( err => {
                console.log(err.response)
                this.show = false
            })
        },
        WMSincronizacionBDListDemo(){
            this.show = true
            this.$bvModal.hide('modal-sincronizacion');
            this.axios.post('admin/WMSincronizacionBDListDemo', {
                'GeneracionFactura' : this.idPlanilla
            })
            .then( res => {
                console.log(res.data)

                if(res.data.status == 1) {
                    this.listarFacturas()
                    this.idPlanilla = []
                    this.showModal('success', res.data.message, res.data.values, res.data.status)
                }
                else{
                    this.idPlanilla = []
                    this.showModal('danger', res.data.message, res.data.values, res.data.status)
                }
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
                        this.show = false
                    }
                })
                .catch(e => {
                    this.arrayFacturas = [];
                    this.show = false
                })
        },
    },

    created(){
        this.WMGet_Lecturas_Pendientes()
        this.listarFacturas()
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