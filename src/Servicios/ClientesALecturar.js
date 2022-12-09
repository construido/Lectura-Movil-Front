import NavBar from '@/components/NavBar.vue'
import BtnAtras from '@/components/BtnAtras.vue'
import {SessionExpirada, DataBaseAlias, EmpresaNombre} from '@/Servicios/ControlErrores'

export default {
    name: 'LecturaInspeccion',
    data() {
        return {
            // LocalStorage
            DataBaseAlias: DataBaseAlias(),
            EmpresaNombre: EmpresaNombre(),

            arrayLecturas: [],
            arrayLecturasPendientes: [],
            buscar: '',
            id: '',
            tipo: 'Ubicacion',
            lecturados: '',
            pendientes: '',

            show: false,

            // PAGINACIÓN
            pagination : {
                'total' : 0,
                'current_page' : 0,
                'per_page' : 0,
                'last_page' : 0,
                'from' : 0,
                'to' : 0,
            },

            offset : 2,

            // HEADER
            zona: '',
            ruta: ''
        }
    },

    components:{
        'NavBar': NavBar,
        'BtnAtras': BtnAtras
    },

    created() {
        this.id = this.$route.params.GeneracionFactura;
        this.lecturasPendientesLecturados(this.id, this.DataBaseAlias);
        this.listarLecturas();
    },

    methods: {
        cambiarPagina(page){
            //Actualiza la página actual
            this.pagination.current_page = page;
            this.listarLecturas(page);
        },
        lecturarCliente(id, cli){
          this.$router.push('/lecturacion/lecturacliente/'+id+'/'+cli)
        },
        lecturasPendientesLecturados(id, DataBaseAlias){
            this.axios.post('/admin/lecturasPendientesLecturados?tcGeneracionFactura='+id+'&DataBaseAlias='+DataBaseAlias)
                .then(res => {
                    if (res.data.status == 403){
                        SessionExpirada();
                    }else{
                        this.arrayLecturasPendientes = res.data.values;
                        this.lecturados = this.arrayLecturasPendientes[0].Lecturados;
                        this.pendientes = this.arrayLecturasPendientes[0].Pendientes;
                    }
                })
                .catch(e => {
                    console.log(e.response);
                })
        },
        listarLecturas(page){
            this.show = true;
            this.axios.post('/admin/listarLecturas?page='+page+'&tcGeneracionFactura='+this.id+'&dato='+this.buscar+'&tipo='+this.tipo+'&DataBaseAlias='+this.DataBaseAlias)
                .then(res => {
                    if (res.data.status == 403){
                        SessionExpirada();
                    }else{
                        this.pagination    = res.data.values.pagination;
                        this.arrayLecturas = res.data.values.generacionLectura.data;
    
                        if(res.data.values.generacionLectura.data.length > 0){
                            this.zona = this.arrayLecturas[0].Zona;
                            this.ruta = this.arrayLecturas[0].Ruta;
                        }
                        this.show = false;
                    }
                })
                .catch(e => {
                    this.arrayLecturas = [];
                    this.show = false;
                })
        },
        limpiar(){
            this.buscar = '';
            this.tipo = 'Ubicacion';
            this.listarLecturas();
        },
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
    }
}