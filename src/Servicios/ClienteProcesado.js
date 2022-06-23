import NavBar from '@/components/NavBar.vue'
import BtnAtras from '@/components/BtnAtras.vue'

export default {
    name: 'LecturaInspeccion',
    data() {
        return {
            arrayLecturas: [],
            arrayLecturasPendientes: [],
            buscar: '',
            id: '',
            tipo: 'Ubicacion',
            lecturados: '',
            pendientes: '',

            show: false,
            nombreAlias: '',
            messageAlerta: '',

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
        this.nombreAlias = this.DataBaseAlias;
        this.id = this.$route.params.GeneracionFactura;
        this.lecturasPendientesLecturados(this.id, this.nombreAlias);
        this.listarLecturas();
    },

    methods: {
        cambiarPagina(page){
            //Actualiza la página actual
            this.pagination.current_page = page;
            this.listarLecturas(page);
        },
        lecturarCliente(id, cli){
          this.$router.push('/lecturacion/procesadocliente/'+id+'/'+cli)
        },
        RecalcularFactura(GeneracionFactura, Cliente){
            this.show = true;
            this.axios.post('/admin/CrearFactura', {
                'EmpresaNombre'       : this.EmpresaNombre,
                'DataBaseAlias'       : this.DataBaseAlias,
                'tnGeneracionFactura' : GeneracionFactura,
                'tnPlomero'           : this.Plomero,
                'tnCliente'           : Cliente
            }).then(res => {
                console.log(res.data);
                if (res.data.status == 1){
                    const url   = res.data.values;
                    const link  = document.createElement('a');
                    link.href   = url;
                    link.target = '_blank'
                    link.click();
                    this.show = false;
                }else{
                    if (res.data.status == 0) {
                        this.messageAlerta = res.data.message;
                        this.$bvModal.show('modal-sin-factura');
                        this.show = false;
                    }
                }

            }).catch(e => {
                console.log(e.response);
            })
        },
        lecturasPendientesLecturados(id, DataBaseAlias){
            this.axios.post('/admin/lecturasPendientesLecturados?tcGeneracionFactura='+id+'&DataBaseAlias='+DataBaseAlias)
                .then(res => {
                    console.log(res);
                    this.arrayLecturasPendientes = res.data.values;

                    this.lecturados = this.arrayLecturasPendientes[0].Lecturados;
                    this.pendientes = this.arrayLecturasPendientes[0].Pendientes;
                })
                .catch(e => {
                    console.log(e.response);
                })
        },
        listarLecturas(page){
            this.show = true;
            this.axios.post('/admin/listarProcesadas?page='+page+'&tcGeneracionFactura='+this.id+'&dato='+this.buscar+'&tipo='+this.tipo+'&DataBaseAlias='+this.DataBaseAlias)
                .then(res => {
                    console.log(res.data);
                    this.arrayLecturas = res.data.values.generacionLectura.data;
                    this.pagination    = res.data.values.pagination;

                    if (res.data.values.generacionLectura.data.length > 0) {
                        this.zona = this.arrayLecturas[0].Zona;
                        this.ruta = this.arrayLecturas[0].Ruta;
                    }

                    this.show = false;
                })
                .catch(e => {
                    this.arrayLecturas = [];
                    console.log(e.response);
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
        DataBaseAlias(){
            return localStorage.getItem('DataBaseAlias');
        },
        EmpresaNombre(){
            return localStorage.getItem('EmpresaNombre');
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
    }
}