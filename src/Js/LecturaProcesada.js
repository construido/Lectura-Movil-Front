import NavBar from '@/components/NavBar.vue'
import BtnAtras from '@/components/BtnAtras.vue'
import { each } from 'jquery';

export default {
    name: 'LecturaProcesada',
    data() {
        return {
            arrayFacturas: [],

            show: false,
            nombreAlias: '',
            plomero: '',

            id: '',
            lecturados: [],
            pendientes: [],

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
        }
    },

    components:{
        'NavBar': NavBar,
        'BtnAtras': BtnAtras
    },

    computed: {
        NombreUsuario(){
            return localStorage.getItem('NombreUsuario');
        },
        ApellidoUsuario(){
            return localStorage.getItem('ApellidoUsuario');
        },
        DataBaseAlias(){
            return localStorage.getItem('DataBaseAlias');
        },
        Plomero(){
            return localStorage.getItem('Plomero');
        },
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

    created() {
        this.listarFacturas();
    },

    methods: {
        cambiarPagina(page){
            //Actualiza la página actual
            this.pagination.current_page = page;
            this.listarFacturas(page);
        },
        listarFacturas(page){
            this.show = true;
            this.axios.post('/admin/listarPlanillaDeLecturasProcesadas?page='+page+'&DataBaseAlias='+this.DataBaseAlias+'&Plomero='+this.Plomero)
                .then(res => {
                    console.log(res.data.values.laGeneracionFactura.data);
                    console.log(res.data.values.pagination);
                    this.pagination = res.data.values.pagination;
                    this.arrayFacturas = res.data.values.laGeneracionFactura.data;
                    this.show = false;
                })
                .catch(e => {
                    this.arrayFacturas = [];
                    console.log(e.response);
                })
        },
        listarClientes(id){
          this.$router.push('/lecturacion/clienteprocesado/'+id)
        },
    }    
}