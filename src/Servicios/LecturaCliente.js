import NavBar from '@/components/NavBar.vue'
import {SessionExpirada, DataBaseAlias, Plomero, EmpresaNombre, HIDANGER, HGDANGER} from '@/Servicios/ControlErrores'

export default {
    name: 'LecturaCliente',

    data() {
        return {
            // LogalStorage
            DataBaseAlias: DataBaseAlias(),
            EmpresaNombre: EmpresaNombre(),
            Plomero      : Plomero(),

            // Habilitar y Desabilitar Impresora y GPS
            HI: HIDANGER(),
            HG: HGDANGER(),

            camposObligatorios: [],
            arrayCliente: [],
            arrayAnormalidades: [],
            coor: {
                lat: 0,
                lng: 0
            },

            lecturados: '',
            pendientes: '',

            anormalidadSelect: 1, // TODO nueva variable implementada 06-10-2022 para la nueva anormalidad
            anormalidad: 'Sin Anormalidad - - 0',
            anormalidad2: 'Sin Anormalidad - - 0', // TODO: nueva variable implementada 06-10-2022 para la nueva anormalidad
            anormalidadCorrecta: 0,
            anormalidadCorrecta2: 0, // TODO: nueva variable implementada 06-10-2022 para la nueva anormalidad
            id: '',
            cli: '',
            lecturaActual: '',

            show: true,
            show2: false,
            tipoConsumoVerificar: '',

            // OBTENER ERRORES DE LA LECTURA
            arrayErrores: [],
            CategoriaE: '',
            ConsumoActualE: 0,
            LecturaActualE: '',
            LecturaAnteriorE: '',
            MediaE: '',
            MedidorMarcaE: '',
            MedidorNumeroE: '',
            MedidorSerieE: '',
            PorcentajeDesviacionE: 0,
            TipoConsumoE: '',
            FinMedidorE: '',

            // OBTENER DATOS VALIDAR
            NombreCategoria: '',
            Consumo: '',
            TipoConsumo: '',
            CodigoConsumo: '',
            arrayValidar: [],
            valido: 0,

            // OBTENCIÓN CLIENTE
            codigoUbicacion: '',
            nombreCliente: '',
            media: '',
            cobro: '',
            medidor: '',
            categoria: '',
            corte: '',
            lecturaAnterior: '',
            llNuevaLectura: true,
            conMedidor: true,

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
            orden: 'top10',
            tipo: 'Nombre',
            dato: '',

            // SUBIR IMAGEN
            image:'', // URL principal http://192.168.100.57:8000/storage/ ** URL dinámica Copagua/Copagua_1630372980_imagen - copia.jpg link de la imagen
            imageEnviar:'',

            disable: '',
            mostrar: false,
            animations: 'none',
            messageAlerta: '',

            // Datos Factura
            idFactura : 0,
            idCliente : 0,
            codUbi: 0,
            cobro: '',
        }
    },

    components:{
        'NavBar': NavBar,
    },

    created(){
        this.id = this.$route.params.GeneracionFactura;
        this.cli = this.$route.params.Cliente;
        this.lecturasPendientesLecturados(this.id, this.DataBaseAlias);
        this.obtenerCliente(this.id, this.cli, this.DataBaseAlias);
        // this.obtenerUbicacion();
        this.listarAnormalidad(1);
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

    methods: {
        habilitarImpresora(){
            if(this.HI == 'danger'){
                localStorage.setItem('HIDANGER', 'success')
                this.HI = HIDANGER()
            }
            else{
                localStorage.setItem('HIDANGER', 'danger')
                this.HI = HIDANGER()
            }
        },
        habilitarGPS(){
            if(this.HG == 'danger'){
                localStorage.setItem('HGDANGER', 'success')
                this.HG = HGDANGER()
            }
            else{
                localStorage.setItem('HGDANGER', 'danger')
                this.HG = HGDANGER()
            }
        },
        mostrarBtn(){
            this.mostrar = true;
        },
        select(){
            this.listarAnormalidad(1);
        },
        cambiarPagina(page){
            //Actualiza la página actual
            this.pagination.current_page = page;
            this.listarAnormalidad(page);
        },
        limpiarCampos(){
            this.dato  = '';
            this.mostrar = true;
        },
        modalAnormalidad(dato){ // TODO: se le implemento la variable "dato" que recibe del formulario
            console.log(dato);
            this.anormalidadSelect = dato; // TODO
            this.$bvModal.show('modal-anormalidad');
        },
        cargarAnormalidad(objeto){ // TODO: se modificó e implementó un if para la selección de anormalidades
            let nombre = objeto.Nombre;
            nombre = nombre != null ? nombre : '';

            if(this.anormalidadSelect == 1){
                this.anormalidad = objeto.NombreAnormalidad + ' - ' + nombre + ' - ' + objeto.MedidorAnormalidad;
                this.anormalidadCorrecta = objeto.MedidorAnormalidad;
                console.log(this.anormalidadCorrecta);
            }else{
                this.anormalidad2 = objeto.NombreAnormalidad + ' - ' + nombre + ' - ' + objeto.MedidorAnormalidad;
                this.anormalidadCorrecta2 = objeto.MedidorAnormalidad;
                console.log(this.anormalidadCorrecta2);
            }

            this.$bvModal.hide('modal-anormalidad');
        },
        habilitar(){
            return this.disable = true;
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
                    this.arrayLecturasPendientes = [];
                    this.lecturados = 0;
                    this.pendientes = 0;
                })
        },
        inputFocus(){
            /*let valor =*/ document.getElementById('input').scrollIntoView()
            // this.X = parseInt(valor.getBoundingClientRect().x)
            // this.Y = parseInt(valor.getBoundingClientRect().y)
            // window.scrollTo(this.X, this.Y);
        },
        DatosFactura(id, cli){
            this.idFactura = id;
            this.idCliente = cli;
        },
        RecalcularFactura(){
            this.show2 = true;
            this.axios.post('/admin/CrearFactura', {
                'EmpresaNombre'       : this.EmpresaNombre,
                'DataBaseAlias'       : this.DataBaseAlias,
                'tnGeneracionFactura' : this.idFactura,
                'tnCliente'           : this.idCliente,
                'tnPlomero'           : this.Plomero
            }).then(res => {
                if (res.data.status == 1){
                    const url   = res.data.values;
                    const link  = document.createElement('a');
                    link.href   = url;
                    link.target = '_blank'
                    link.click();
                    this.limpiarCampos();
                    this.obtenerClienteNext(this.id, this.DataBaseAlias);
                    this.$bvModal.hide('modal-seguir');
                    this.show2  = false;
                }else{
                    if (res.data.status == 0) {
                        this.messageAlerta = res.data.message;
                        this.$bvModal.hide('modal-seguir');
                        this.$bvModal.show('modal-sin-factura');
                        this.show  = false;
                        this.show2 = false;
                    }
                }

            }).catch(e => {
                console.log(e.response);
            })
        },
        CancelarImpresion(){
            this.$bvModal.hide('modal-sin-factura');
            this.$bvModal.hide('modal-seguir');
            this.limpiarCampos();
            this.obtenerClienteNext(this.id, this.DataBaseAlias);
        },
        controlErrores(error){

          var array = [];

          if (error.response.status == 422) {
            array = error.response.data.errors
          }

          return array;

        },
        llenarCampoErrores(){
            this.CategoriaE            = this.arrayErrores.Categoria;
            this.ConsumoActualE        = this.arrayErrores.ConsumoActual;
            this.LecturaActualE        = this.arrayErrores.LecturaActual;
            this.LecturaAnteriorE      = this.arrayErrores.LecturaAnterior;
            this.MediaE                = Math.ceil(this.arrayErrores.Media);
            this.MedidorMarcaE         = this.arrayErrores.MedidorMarca;
            this.MedidorNumeroE        = this.arrayErrores.MedidorNumero;
            this.MedidorSerieE         = this.arrayErrores.MedidorSerie;
            this.PorcentajeDesviacionE = this.arrayErrores.PorcentajeDesviacion;
            this.TipoConsumoE          = this.arrayErrores.TipoConsumo;
            this.FinMedidorE           = this.arrayErrores.FinMedidor;
        },
        guardarLectura(){
            this.show = true;
            let indice = this.imageEnviar.length;
            let formData = new FormData();

            for (let index = 0; index < indice; index++){
                formData.append('imageEnviar[]', this.imageEnviar[index]);
            }
            
            formData.append('tnCliente', this.cli);
            formData.append('tnMedia', this.media);
            formData.append('Latitud', this.coor.lat);
            formData.append('Longitud', this.coor.lng);
            formData.append('tnMedidor', this.medidor);
            formData.append('tnPlomero', this.Plomero);
            formData.append('tnCategoria', this.categoria);
            formData.append('tnGeneracionFactura', this.id);
            formData.append('DataBaseAlias', this.DataBaseAlias);
            formData.append('EmpresaNombre', this.EmpresaNombre);
            formData.append('tnLecturaActual', this.lecturaActual);
            formData.append('llNuevaLectura', this.llNuevaLectura);
            formData.append('tnCobro', this.arrayCliente[0].Cobro);
            formData.append('tnLecturaAnterior', this.lecturaAnterior);
            formData.append('tnMedidorAnormalidad', this.anormalidadCorrecta);
            formData.append('tnMedidorAnormalidad2', this.anormalidadCorrecta2); // TODO:
            formData.append('tnCodigoUbicacion', this.arrayCliente[0].CodigoUbicacion);

            this.axios.post('/admin/DO_LecturarNormal', formData).then(res => {
                if (res.data.values.Error == 2000 || this.conMedidor == false) {
                    this.valido = 0;
                    this.lecturaActual = '';
                    this.anormalidad = 'Sin Anormalidad - - 0',
                    this.anormalidad2 = 'Sin Anormalidad - - 0',  // TODO:
                    this.anormalidadCorrecta = 0,
                    this.anormalidadCorrecta2 = 0,  // TODO:
                    this.$bvModal.show('modal-seguir');
                    this.DatosFactura(this.id, this.cli);
                    this.lecturados = parseInt(this.lecturados) + 1;
                    let input = document.getElementById("file");
                    input.value = ''
                    this.show = false;
                }else{
                    this.arrayErrores = res.data.values;
                    this.llenarCampoErrores();
                    this.show = false;
                    this.$bvModal.show('modal-scoped');
                }

            }).catch(e => {
                console.log(e);
            })
        },
        obtenerUbicacion() {
            if("geolocation" in navigator){
                navigator.geolocation.getCurrentPosition(ubicacion => {
                    let coordenadas = ubicacion.coords;
                    this.coor.lat = coordenadas.latitude;
                    this.coor.lng = coordenadas.longitude;
                }, 
                () => { 
                    alert("No pude obtener tu ubicación. Intenta más tarde.")
                },
                { enableHighAccuracy: true, }
                );
            }else alert("Lo siento, tu navegador no tiene soporte para obtener tu ubicación")
        },
        // obtención de imagenes INICIO
        obtenerImagen(e) {
            var files = e.target.files || e.dataTransfer.files;
            this.imageEnviar = files;
            if (!files.length)
                return;
        },
        listarAnormalidad(page){
            this.show2 = true;
            this.animations = 'spin-pulse';
            this.axios.post('/admin/llenarSelectAnormalidad?page='+page+'&tcDataBaseAlias='+this.DataBaseAlias+'&tcOrden='+this.orden+'&tcTipo='+this.tipo+'&tcDato='+this.dato)
                .then(res => {
                    this.pagination = res.data.values.pagination;
                    this.arrayAnormalidades = res.data.values.laMedidorAnormalidad.data;
                    this.mostrar = !this.mostrar;
                    this.show2 = false;
                    this.animations = 'none';
                })
                .catch(e => {
                    this.arrayAnormalidades = [];
                    this.show2 = false;
                })
        },
        obtenerCliente(id, cli, DataBaseAlias){
            this.axios.post('/admin/verLecturaId?tcGeneracionFactura='+id+'&tcCliente='+cli+'&DataBaseAlias='+DataBaseAlias)
                .then(res => {
                    if (res.data.status == 403){
                        SessionExpirada();
                    }else{
                        this.arrayCliente = res.data.values;
                        this.cargarValores();
                    }
                })
                .catch(e => {
                    console.log(e.response);
                })
        },
        obtenerClienteNext(id, DataBaseAlias){
            this.show = true;
            this.axios.post('/admin/verLecturaIdNext?tcGeneracionFactura='+id+'&DataBaseAlias='+DataBaseAlias)
                .then(res => {
                    if (res.data.status == 403){
                        SessionExpirada();
                    }else{
                        if (res.data.values.length == 0){
                            this.$bvModal.show('modal-sin-cliente');
                        }else{
                            this.arrayCliente = res.data.values;
                            this.cargarValoresNext();
                        }
                        this.show = false;
                    }
                })
                .catch(e => {
                    this.arrayAnormalidades = [];
                    console.log(e.response);
                    this.show = false;
                })
        },
        cargarValoresNext(){
            this.codigoUbicacion = this.arrayCliente[0].CodigoUbicacion;
            this.media           = this.arrayCliente[0].Media;
            this.lecturaAnterior = this.arrayCliente[0].LecturaAnterior;
            this.nombreCliente   = this.arrayCliente[0].Nombre;
            this.corte           = this.arrayCliente[0].Corte;
            this.id              = this.arrayCliente[0].GeneracionFactura;
            this.cli             = this.arrayCliente[0].Cliente;
            this.anormalidad     = 'Sin Anormalidad - - 0',
            this.anormalidadCorrecta = 0,

            this.medidor         = this.arrayCliente[0].Medidor;

            if(this.medidor == 0)
                this.conMedidor = false;
            else
                this.conMedidor = true;

            this.show            = false;
        },
        cargarValores(){
            this.codigoUbicacion = this.arrayCliente[0].CodigoUbicacion;
            this.media           = this.arrayCliente[0].Media;
            this.lecturaAnterior = this.arrayCliente[0].LecturaAnterior;
            this.nombreCliente   = this.arrayCliente[0].Nombre;
            this.corte           = this.arrayCliente[0].Corte;
            this.medidor         = this.arrayCliente[0].Medidor;
            this.categoria       = this.arrayCliente[0].Categoria;

            if(this.medidor == 0)
                this.conMedidor = false;
            else
                this.conMedidor = true;

            this.show = false;
        },
    },
}