import NavBar from '@/components/NavBar.vue'
import {SessionExpirada, DataBaseAlias, Plomero, EmpresaNombre} from './ControlErrores'

export default {
    name: 'LecturaCliente',

    data() {
        return {
            deshabilitarBoton: false, // 2/9/2023 IMPLEMENTADO POR ELOY
            AnormalidadNueva: null, // 2/9/2023 IMPLEMENTADO POR ELOY
            AnormalidadMedidor: null, // 2/9/2023 IMPLEMENTADO POR ELOY
            AnormalidadBajaTemporal: null, // 2/9/2023 IMPLEMENTADO POR ELOY

            numeroSerie: null, // 12/8/2023 IMPLEMENTADO POR ELOY
            exigirFoto: null, // TODO: implementado el 13/08/2023
            regla: null, // TODO: implementado el 13/08/2023

            // TODO
            slide: 0,
            glosa: '',
            arrayFotos: [],
            
            // Buscar Cliente
            dato: '',
            zona: '',
            ruta: '',
            tipoC: 'Ubicacion',
            objetoCliente: '',
            showMessage: false,
            messageCliente: 'Cliente no encontrado',

            // LogalStorage
            EmpresaNombre: EmpresaNombre(),
            DataBaseAlias: DataBaseAlias(),
            Plomero      : Plomero(),

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
            show3: false,
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
            medidor: '',
            categoria: '',
            corte: '',
            lecturaAnterior: '',
            llNuevaLectura: false,
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
            messageAlerta: '',

            // Datos Factura
            idFactura : 0,
            idCliente : 0,
            codUbi: 0,
            cobro: '',

            switchCategorizar: false,
            switchLecturaPendiente : false,
        }
    },

    components:{
        'NavBar': NavBar,
    },

    created(){
        this.id = this.$route.params.GeneracionFactura;
        this.cli = this.$route.params.Cliente;        
        this.buscarParametroExigirFoto()
        this.lecturasPendientesLecturados(this.id, this.DataBaseAlias);
        this.obtenerCliente(this.id, this.cli, this.DataBaseAlias);
        // this.obtenerUbicacion();
        this.listarAnormalidad(1);
        this.imageAllClient()
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
        verificarAnormalidadEspecial(anormalidad){
            console.log(anormalidad)
            if(anormalidad > 0){
                if(anormalidad == this.AnormalidadNueva || anormalidad == this.AnormalidadMedidor || anormalidad == this.AnormalidadBajaTemporal) this.deshabilitarBoton = true
                else this.deshabilitarBoton = false
            }else {
                this.deshabilitarBoton = false
            }

            console.log(this.deshabilitarBoton)
        },
        buscarParametroExigirFoto(){ // TODO: implementado el 13/08/2023
            this.axios.get('/admin/parametroLectura?DataBaseAlias='+this.DataBaseAlias)
            .then(res => {
                console.log(res.data)
                this.exigirFoto = res.data[0].ExigirFotoAplicarPromedio
                this.AnormalidadNueva = res.data[0].AnormalidadNuevo
                this.AnormalidadMedidor = res.data[0].AnormalidadCambioMedidor
                this.AnormalidadBajaTemporal = res.data[0].AnormalidadRegularizacionBajaTemporal
            })
            .catch(e => {
                console.log(e)
            })
        },
        modalFotos(){
            this.$bvModal.show('modal-foto')
        },
        imageAllClient(){
            this.axios.post('/admin/imagenAllClient', {
                "Cliente"           : this.cli,
                "DataBaseAlias"     : this.DataBaseAlias,
                "GeneracionFactura" : this.id
            })
            .then(res => {
                console.log(res.data[0])
                this.arrayFotos = res.data
            })
            .catch(err => {
                console.log(err)
            })
        },
        categorizar(){
            this.show = true
            this.switchCategorizar != this.switchCategorizar
            if(this.switchCategorizar){
                this.axios.post('/admin/Categorizar', {
                    'DataBaseAlias'       : this.DataBaseAlias
                })
                .then(res => {
                    console.log(res.data)
                    this.anormalidad2 = res.data[0].NombreAnormalidad + ' - ' + res.data[0].Nombre + ' - ' + res.data[0].AnormalidadVerificarCategoria;
                    this.anormalidadCorrecta2 = res.data[0].AnormalidadVerificarCategoria;
                    console.log(this.anormalidadCorrecta2);
                    this.show = false
                })
                .catch(e => {
                    console.log(e.response)
                    this.show = false
                })
            }else{
                console.log(this.switchCategorizar)
                this.anormalidad2 = 'Sin Anormalidad - - 0'
                this.anormalidadCorrecta2 = 0
                console.log(this.anormalidadCorrecta2);
                this.show = false
            }
        },
        lecturaPendiente(){
            this.show = true
            this.switchLecturaPendiente != this.switchLecturaPendiente
            if(this.switchLecturaPendiente){
                this.axios.post('/admin/LecturaPendiente', {
                    'DataBaseAlias' : this.DataBaseAlias
                })
                .then(res => {
                    console.log(res.data)
                    this.anormalidad = res.data[0].NombreAnormalidad + ' - ' + res.data[0].Nombre + ' - ' + res.data[0].AnormalidadPendiente;
                    this.anormalidadCorrecta = res.data[0].AnormalidadPendiente;
                    console.log(this.anormalidadCorrecta);
                    this.show = false
                })
                .catch(e => {
                    console.log(e.response)
                    this.show = false
                })
            }else{
                console.log(this.switchLecturaPendiente)
                this.anormalidad = 'Sin Anormalidad - - 0'
                this.anormalidadCorrecta = 0
                console.log(this.anormalidadCorrecta);
                this.show = false
            }
        },
        modalCliente(){ // TODO: se le implemento la variable "dato" que recibe del formulario
            this.$bvModal.show('modal-buscar');
        },
        buscarCliente(){
            this.show3 = true;
            this.axios.post('/admin/buscarCliente', {
                'tcGeneracionFactura' : this.id,
                'dato'                : this.dato,
                'tipo'                : this.tipoC,
                'DataBaseAlias'       : this.DataBaseAlias
            })
            .then(res => {
                if (res.data.status == 403){
                    SessionExpirada();
                }else{
                    this.arrayCliente = res.data.values.GeneracionLectura
                    if(this.arrayCliente.length > 0){
                        this.cargarValoresNext()
                        this.showMessage = false
                        this.switchCategorizar = res.data.values.Categorizar
                        this.switchLecturaPendiente = res.data.values.Pendiente
                    }else{
                        this.showMessage = true
                        this.show3 = false
                    }
                }
            })
            .catch(e => {
                console.log(e.response)
            })
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

            /*this.anormalidad = objeto.NombreAnormalidad + ' - ' + nombre + ' - ' + objeto.MedidorAnormalidad;
            this.anormalidadCorrecta = objeto.MedidorAnormalidad;*/

            if(this.anormalidadSelect == 1){
                this.anormalidad = objeto.NombreAnormalidad + ' - ' + nombre + ' - ' + objeto.MedidorAnormalidad;
                this.anormalidadCorrecta = objeto.MedidorAnormalidad;
                this.regla = objeto.Regla; // TODO: implementado el 13/08/2023
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
        ok(){
            alert('Hola');
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
        verificarRegla(){ // TODO: implementado el 30/07/2023
            let verificar = true
            if(this.regla == 4){
                if(this.exigirFoto == 1){
                    if(this.imageEnviar.length <= 0){
                        verificar = false
                    }
                }
            }

            return verificar
        },
        guardarLectura(){
            this.show = true;

            if(this.verificarRegla()){ // TODO: implementado el 30/07/2023
                if(this.glosa != ''){
                    let indice = this.imageEnviar.length;
                    let formData = new FormData();

                    for (let index = 0; index < indice; index++){
                        formData.append('imageEnviar[]', this.imageEnviar[index]);
                    }
                    
                    formData.append('tnCliente', this.cli);
                    formData.append('tnGlosa', this.glosa);
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
                        console.log(res.data);
        
                        if (res.data.values.Error == 2000 || this.conMedidor == false) {
                            this.valido = 0
                            this.glosa = ''
                            this.lecturaActual = ''
                            this.anormalidad = 'Sin Anormalidad - - 0'
                            this.anormalidad2 = 'Sin Anormalidad - - 0'  // TODO:
                            this.anormalidadCorrecta = 0
                            this.anormalidadCorrecta2 = 0  // TODO:
        
                            if(this.switchLecturaPendiente == true){
                                this.$bvModal.hide('modal-seguir')
                                this.show = false
                                this.CancelarImpresion()
                            }
                            else{
                                this.$bvModal.show('modal-seguir')
                                this.show = false
                            }
        
                            this.DatosFactura(this.id, this.cli)
                            let input = document.getElementById("file")
                            input.value = ''
                            this.switchCategorizar = false
                            this.switchLecturaPendiente = false
                        }else{
                            this.arrayErrores = res.data.values;
                            this.llenarCampoErrores();
                            this.show = false;
                            this.$bvModal.show('modal-scoped');
                        }
        
                    }).catch(e => {
                        console.log(e.response);
                        // this.camposObligatorios = this.controlErrores(e);
                    })
                }else{
                    this.show = false
                }
            }else{
                this.show = false
                this.$bvModal.show('modal-error');
            }
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
        obtenerImagen(e) {
            var files = e.target.files || e.dataTransfer.files;
            this.imageEnviar = files;
            if (!files.length)
                return;
        },
        listarAnormalidad(page){
            this.show2 = true;
            this.axios.post('/admin/llenarSelectAnormalidad?page='+page+'&tcDataBaseAlias='+this.DataBaseAlias+'&tcOrden='+this.orden+'&tcTipo='+this.tipo+'&tcDato='+this.dato)
                .then(res => {
                    this.pagination = res.data.values.pagination;
                    this.arrayAnormalidades = res.data.values.laMedidorAnormalidad.data;
                    this.mostrar = !this.mostrar;
                    this.show2 = false;
                })
                .catch(e => {
                    this.sizes = [];
                    console.log(e.response);
                })
        },
        obtenerCliente(id, cli, DataBaseAlias){
            this.axios.post('/admin/verLecturaIdProcesada?tcGeneracionFactura='+id+'&tcCliente='+cli+'&DataBaseAlias='+DataBaseAlias)
                .then(res => {
                    if (res.data.status == 403){
                        SessionExpirada();
                    }else{
                        this.arrayCliente = res.data.values;
                        console.log(this.arrayCliente[0].Regla)
                        this.regla = this.arrayCliente[0].Regla
                        let cadena = this.arrayCliente[0].CodigoUbicacion
                        this.zona = cadena.substr(0, 2)
                        this.ruta = cadena.substr(2, 2)
                        this.switchCategorizar = res.data.values.Categorizar
                        this.switchLecturaPendiente = res.data.values.Pendiente
                        this.cargarValores();
                    }
                })
                .catch(e => {
                    this.show = false;
                })
        },
        obtenerClienteNext(id, DataBaseAlias){
            this.show = true;
            this.axios.post('/admin/verLecturaIdNextProcesada?tcGeneracionFactura='+id+'&DataBaseAlias='+DataBaseAlias+'&CodigoUbicacion='+this.codigoUbicacion)
                .then(res => {
                    console.log(res.data.values)
                    if (res.data.status == 403){
                        SessionExpirada();
                    }else{
                        if (res.data.values.GeneracionLectura.length == 0) {
                            this.$bvModal.show('modal-sin-cliente');
                        }else{
                            this.arrayCliente = res.data.values.GeneracionLectura
                            this.switchCategorizar = res.data.values.Categorizar
                            this.switchLecturaPendiente = res.data.values.Pendiente
                            this.cargarValoresNext();
                        }
                        this.show = false;
                    }
                })
                .catch(e => {
                    console.log(e);
                    this.show = false;
                })
        },
        cargarValoresNext(){
            this.codigoUbicacion = this.arrayCliente[0].CodigoUbicacion;
            this.media           = this.arrayCliente[0].Media;
            this.lecturaAnterior = this.arrayCliente[0].LecturaAnterior;
            this.nombreCliente   = this.arrayCliente[0].Nombre;
            this.corte           = this.arrayCliente[0].Corte ? 'Sí' : 'No';
            this.id              = this.arrayCliente[0].GeneracionFactura;
            this.cli             = this.arrayCliente[0].Cliente;
            this.medidor         = this.arrayCliente[0].Medidor;
            this.lecturaActual   = this.arrayCliente[0].LecturaActual;
            this.categoria       = this.arrayCliente[0].Categoria;
            this.NombreCategoria = this.arrayCliente[0].NombreCategoria;
            this.regla           = this.arrayCliente[0].Regla;

            if(this.arrayCliente[0].NumeroSerie && this.arrayCliente[0].Numero){
                this.numeroSerie = this.arrayCliente[0].NumeroSerie + ' - ' + this.arrayCliente[0].Numero
            } else {
                this.numeroSerie = 'Sin Medidor'
            }

            if(this.arrayCliente[0].NombreTC != null){
                this.anormalidad = this.arrayCliente[0].NombreAnormalidad+' - '+this.arrayCliente[0].NombreTC+' - '+this.arrayCliente[0].MedidorAnormalidad; // 'Sin Anormalidad - - 0',
                this.anormalidadCorrecta = this.arrayCliente[0].MedidorAnormalidad;
            }else{
                this.anormalidad = 'Sin Anormalidad - - 0'
                this.anormalidadCorrecta = 0
            }

            if(this.arrayCliente[0].N2 != null){
                this.anormalidad2 = this.arrayCliente[0].NA2+' - '+this.arrayCliente[0].N2+' - '+this.arrayCliente[0].MedidorAnormalidad2; // 'Sin Anormalidad - - 0',
                this.anormalidadCorrecta2 = this.arrayCliente[0].MedidorAnormalidad2;
            }else{
                this.anormalidad2 = 'Sin Anormalidad - - 0'
                this.anormalidadCorrecta2 = 0
            }

            if(this.medidor == 0)
                this.conMedidor = false;
            else
                this.conMedidor = true;

            this.show           = false;
            this.show3          = false;

            this.verificarAnormalidadEspecial(this.anormalidadCorrecta)
            this.$bvModal.hide('modal-buscar');
        },
        cargarValores(){
            this.codigoUbicacion = this.arrayCliente[0].CodigoUbicacion;
            this.media           = this.arrayCliente[0].Media;
            this.lecturaAnterior = this.arrayCliente[0].LecturaAnterior;
            this.nombreCliente   = this.arrayCliente[0].Nombre;
            this.corte           = this.arrayCliente[0].Corte ? 'Sí' : 'No';
            this.medidor         = this.arrayCliente[0].Medidor;
            this.categoria       = this.arrayCliente[0].Categoria;
            this.lecturaActual   = this.arrayCliente[0].LecturaActual;
            this.NombreCategoria = this.arrayCliente[0].NombreCategoria;

            if(this.arrayCliente[0].NumeroSerie && this.arrayCliente[0].Numero){
                this.numeroSerie = this.arrayCliente[0].NumeroSerie + ' - ' + this.arrayCliente[0].Numero
            } else {
                this.numeroSerie = 'Sin Medidor'
            }

            if(this.arrayCliente[0].NombreTC != null){
                this.anormalidad = this.arrayCliente[0].NombreAnormalidad+' - '+this.arrayCliente[0].NombreTC+' - '+this.arrayCliente[0].MedidorAnormalidad; // 'Sin Anormalidad - - 0',
                this.anormalidadCorrecta = this.arrayCliente[0].MedidorAnormalidad;
            }

            if(this.arrayCliente[0].N2 != null){
                this.anormalidad2 = this.arrayCliente[0].NA2+' - '+this.arrayCliente[0].N2+' - '+this.arrayCliente[0].MedidorAnormalidad2; // 'Sin Anormalidad - - 0',
                this.anormalidadCorrecta2 = this.arrayCliente[0].MedidorAnormalidad2;
            }

            if(this.medidor == 0)
                this.conMedidor = false;
            else
                this.conMedidor = true;

            this.verificarAnormalidadEspecial(this.anormalidadCorrecta)
            this.show = false;
        },
    },
}