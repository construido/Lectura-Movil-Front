import NavBar from '@/components/NavBar.vue'
import BtnAtras from '@/components/BtnAtras.vue'
import {SessionExpirada, DataBaseAlias, Plomero, EmpresaNombre} from './ControlErrores'

export default {
    name: 'LecturaInspeccion',
    data() {
        return {
            // LogalStorage
            DataBaseAlias: DataBaseAlias(),
            EmpresaNombre: EmpresaNombre(),
            Plomero      : Plomero(),

            id: '',
            arrayLecturas: [],
            arrayLecturasPendientes: [],
            buscar: '',
            dato: '',
            tipo: 'LecturaPendiente',
            lecturados: '',
            pendientes: '',

            show: false,
            show2: false,
            nombreAlias: '',
            messageAlerta: '',

            dato2: '',
            mostrar: false,
            orden: 'top10',
            tipo2: 'Nombre',
            arrayAnormalidades: [],

            // PAGINACIÓN
            pagination : {
                'total' : 0,
                'current_page' : 0,
                'per_page' : 0,
                'last_page' : 0,
                'from' : 0,
                'to' : 0,
            },

            pagination2 : {
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
        // this.lecturasPendientesLecturados(this.id, this.DataBaseAlias);
        this.buscar = localStorage.getItem('Buscar') ? localStorage.getItem('Buscar') : ''
        this.dato   = localStorage.getItem('Dato') ? localStorage.getItem('Dato') : ''
        this.tipo   = localStorage.getItem('Tipo') ? localStorage.getItem('Tipo') : 'LecturaPendiente',
        this.listarAnormalidad(1)
        this.listarLecturas();
    },

    methods: {
        atras(){
            localStorage.removeItem('Tipo');
            localStorage.removeItem('Dato');
            localStorage.removeItem('Buscar');
            this.$router.go(-1)
        },
        limpiarCampos(){
            this.dato2  = '';
            this.mostrar = true;
        },
        mostrarBtn(){
            this.mostrar = true;
        },
        select(){
            this.listarAnormalidad(1);
        },
        listarAnormalidad(page){
            this.show2 = true;
            this.axios.post('/admin/llenarSelectAnormalidad?page='+page+'&tcDataBaseAlias='+this.DataBaseAlias+'&tcOrden='+this.orden+'&tcTipo='+this.tipo2+'&tcDato='+this.dato2)
            .then(res => {
                this.pagination2 = res.data.values.pagination;
                this.arrayAnormalidades = res.data.values.laMedidorAnormalidad.data;
                this.mostrar = !this.mostrar;
                this.show2 = false;
            })
            .catch(e => {
                console.log(e.response);
            })
        },
        modalAnormalidad(){
            this.$bvModal.show('modal-anormalidad');
        },
        cargarAnormalidad(objeto){
            let nombre = objeto.Nombre;
            nombre = nombre != null ? nombre : '';

            this.buscar = objeto.NombreAnormalidad + ' - ' + nombre + ' - ' + objeto.MedidorAnormalidad;
            this.dato = objeto.MedidorAnormalidad;
            // this.anormalidadCorrecta = objeto.MedidorAnormalidad;
            this.$bvModal.hide('modal-anormalidad');
        },
        cambiarPagina(page){
            //Actualiza la página actual
            this.pagination.current_page = page;
            this.listarLecturas(page);
        },
        cambiarPagina2(page){
            //Actualiza la página actual
            this.pagination2.current_page = page;
            this.listarAnormalidad(page);
        },
        lecturarCliente(id, cli, anor){
            localStorage.setItem('Tipo', this.tipo)
            localStorage.setItem('Dato', this.dato)
            localStorage.setItem('Buscar', this.buscar)
            this.$router.push('/lecturacion/clientependiente/'+id+'/'+cli+'/'+anor)
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

                if (res.data.status == 403){
                    SessionExpirada();
                }else{
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
                }
                this.show = false;
            }).catch(e => {
                console.log(e.response);
                this.show = false;
            })
        },
        lecturasPendientesLecturados(id, DataBaseAlias){
            this.axios.post('/admin/lecturasPendientesAnormalidades', {
                'tcGeneracionFactura' : id,
                'tcTipo'              : this.tipo,
                'Anormalidad'         : this.dato,
                'DataBaseAlias'       : DataBaseAlias
            })
            .then(res => {
                if (res.data.status == 403){
                    SessionExpirada();
                }else{
                    this.arrayLecturasPendientes = res.data.values;
                    // this.lecturados = this.arrayLecturasPendientes[0].Lecturados;
                    this.pendientes = this.arrayLecturasPendientes[0].Pendientes;
                }
            })
            .catch(e => {
                this.arrayLecturasPendientes = [];
                this.lecturados = 0;
                this.pendientes = 0;
            })
        },
        listarLecturas(page){
            this.show = true;
            this.lecturasPendientesLecturados(this.id, this.DataBaseAlias)
            this.axios.post('/admin/listarPendientes?page='+page+'&tcGeneracionFactura='+this.id+'&dato='+this.dato+'&tipo='+this.tipo+'&DataBaseAlias='+this.DataBaseAlias)
                .then(res => {
                    if (res.data.status == 403){
                        SessionExpirada();
                    }else{
                        this.arrayLecturas = res.data.values.generacionLectura.data;
                        this.pagination    = res.data.values.pagination;
                        this.lecturados    = this.arrayLecturas.length

                        if (res.data.values.generacionLectura.data.length > 0) {
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
        },

        isActived2: function(){
            return this.pagination2.current_page;
        },
        pagesNumber2: function() {
            if(!this.pagination2.to) {
                return [];
            }
            var from = this.pagination2.current_page - this.offset; 
            if(from < 1) {
                from = 1;
            }

            var to = from + (this.offset * 2); 
            if(to >= this.pagination2.last_page){
                to = this.pagination2.last_page;
            }  
            var pagesArray = [];
            while(from <= to) {
                pagesArray.push(from);
                from++;
            }
            return pagesArray;             
        },
    }
}