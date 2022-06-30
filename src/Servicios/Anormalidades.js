import NavBar from '@/components/NavBar.vue'
import {SessionExpirada, DataBaseAlias, EmpresaNombre} from './ControlErrores'

export default {
    name: 'Anormalidades',

    data() {
        return {
            // LogalStorage
            DataBaseAlias: DataBaseAlias(),
            EmpresaNombre: EmpresaNombre(),

            arrayAnormalidades: [],
            show: false,

            // Formulario
            codigo:      '',
            nombre:      '',
            tipoConsumo: '',
            regla:       '',
            inspeccion:  '',
            informativo: '',
            animation:   'none', // spin-pulse - para activar la animacion

            // Paginación
            nextDisabled:          false,
            nextEndDisabled:       false,
            previousDisabled:      true,
            previousStartDisabled: true,

            // Variables auxiliares
            tipo:   'Nombre',
            index:  0,
            count:  '',
            buscar: '',
            encontrado: ''
        }
    },

    methods:{
        listarAnormalidades(tipo, buscar, DataBaseAlias){
            this.show = true;
            this.axios.post('/admin/AnormalidadesDeMedidor?Tipo='+tipo+'&Dato='+buscar+'&DataBaseAlias='+DataBaseAlias)
                .then(res => {
                    if (res.data.status == 403){
                        SessionExpirada();
                    }else{
                        if (res.data.values == 0) {
                            this.nextDisabled         = true;
                            this.nextEndDisabled      = true;
                            this.previousDisabled     = true;
                            this.previousStartDisabled= true;
                            this.$bvModal.show('modal-scoped');
                        }else{
                            this.arrayAnormalidades = res.data.values;
                            this.count = this.arrayAnormalidades.length;
                            this.index = 0;
                            this.cargarValores();
                            if (this.count == 1) {
                                this.nextDisabled         = true;
                                this.nextEndDisabled      = true;
                                this.previousDisabled     = true;
                                this.previousStartDisabled= true;
                            }else{
                                this.nextDisabled         = false;
                                this.nextEndDisabled      = false;
                                this.previousDisabled     = true;
                                this.previousStartDisabled= true;
                                
                            }
                        }
                        this.show = false;
                    }
                })
                .catch(e => {
                    this.arrayAnormalidades = [];
                    this.show = false;
                })
        },
        cargarValores(){
            this.codigo     = this.arrayAnormalidades[0].MedidorAnormalidad < 10 ? 
                this.codigo = '00' + this.arrayAnormalidades[0].MedidorAnormalidad : 
                this.codigo = '0' + this.arrayAnormalidades[0].MedidorAnormalidad;

            this.nombre      = this.arrayAnormalidades[0].NombreAnormalidad;
            this.tipoConsumo = this.arrayAnormalidades[0].TipoConsumo ? this.arrayAnormalidades[0].TipoConsumo : 'Sin Tipo Consumo';
            this.regla       = this.arrayAnormalidades[0].Regla ? this.arrayAnormalidades[0].Regla : 'Sin Regla Aplicable';
            this.inspeccion  = this.arrayAnormalidades[0].Inspeccion == 1 ? 'Sí' : 'No';
            this.informativo = this.arrayAnormalidades[0].Informativo == 1 ? 'Sí' : 'No';
        },
        cargarValoresSiguiente(){
            this.index = this.index + 1;

            if (this.index < this.count) {

                this.codigo = this.arrayAnormalidades[this.index].MedidorAnormalidad < 10 ? 
                    this.codigo = '00' + this.arrayAnormalidades[this.index].MedidorAnormalidad : 
                    this.codigo = '0' + this.arrayAnormalidades[this.index].MedidorAnormalidad;

                this.nombre      = this.arrayAnormalidades[this.index].NombreAnormalidad;
                this.tipoConsumo = this.arrayAnormalidades[this.index].TipoConsumo ? this.arrayAnormalidades[this.index].TipoConsumo : 'Sin Tipo Consumo';
                this.regla       = this.arrayAnormalidades[this.index].Regla ? this.arrayAnormalidades[this.index].Regla : 'Sin Regla Aplicable';
                this.inspeccion  = this.arrayAnormalidades[this.index].Inspeccion == 1 ? 'Sí' : 'No';
                this.informativo = this.arrayAnormalidades[this.index].Informativo == 1 ? 'Sí' : 'No';

                this.previousDisabled = false;

                if (this.index == this.count - 1) {
                    this.nextDisabled     = true;
                    this.previousDisabled = false;
                }
            }
        },
        cargarValoresPrevious(){
            this.index = this.index - 1;
            
            if (this.index >= 0) {

                this.codigo = this.arrayAnormalidades[this.index].MedidorAnormalidad < 10 ? 
                    this.codigo = '00' + this.arrayAnormalidades[this.index].MedidorAnormalidad : 
                    this.codigo = '0' + this.arrayAnormalidades[this.index].MedidorAnormalidad;

                this.nombre      = this.arrayAnormalidades[this.index].NombreAnormalidad;
                this.tipoConsumo = this.arrayAnormalidades[this.index].TipoConsumo ? this.arrayAnormalidades[this.index].TipoConsumo : 'Sin Tipo Consumo';
                this.regla       = this.arrayAnormalidades[this.index].Regla ? this.arrayAnormalidades[this.index].Regla : 'Sin Regla Aplicable';
                this.inspeccion  = this.arrayAnormalidades[this.index].Inspeccion == 1 ? 'Sí' : 'No';
                this.informativo = this.arrayAnormalidades[this.index].Informativo == 1 ? 'Sí' : 'No';

                this.nextDisabled = false;

                if (this.index == 0) {
                    this.previousDisabled = true;
                    this.nextDisabled     = false;
                }
            }
        },
        cargarUltimoValor(){
            this.index = this.count - 1;

            this.codigo = this.arrayAnormalidades[this.index].MedidorAnormalidad < 10 ? 
                this.codigo = '00' + this.arrayAnormalidades[this.index].MedidorAnormalidad : 
                this.codigo = '0' + this.arrayAnormalidades[this.index].MedidorAnormalidad;

            this.nombre      = this.arrayAnormalidades[this.index].NombreAnormalidad;
            this.tipoConsumo = this.arrayAnormalidades[this.index].TipoConsumo ? this.arrayAnormalidades[this.index].TipoConsumo : 'Sin Tipo Consumo';
            this.regla       = this.arrayAnormalidades[this.index].Regla ? this.arrayAnormalidades[this.index].Regla : 'Sin Regla Aplicable';
            this.inspeccion  = this.arrayAnormalidades[this.index].Inspeccion == 1 ? 'Sí' : 'No';
            this.informativo = this.arrayAnormalidades[this.index].Informativo == 1 ? 'Sí' : 'No';

            this.nextDisabled          = true;
            this.nextEndDisabled       = true;
            this.previousDisabled      = false;
            this.previousStartDisabled = false;
        },
        cargarPrimerValor(){
            this.index = 0;

            this.codigo = this.arrayAnormalidades[this.index].MedidorAnormalidad < 10 ? 
                this.codigo = '00' + this.arrayAnormalidades[this.index].MedidorAnormalidad : 
                this.codigo = '0' + this.arrayAnormalidades[this.index].MedidorAnormalidad;

            this.nombre      = this.arrayAnormalidades[this.index].NombreAnormalidad;
            this.tipoConsumo = this.arrayAnormalidades[this.index].TipoConsumo ? this.arrayAnormalidades[this.index].TipoConsumo : 'Sin Tipo Consumo';
            this.regla       = this.arrayAnormalidades[this.index].Regla ? this.arrayAnormalidades[this.index].Regla : 'Sin Regla Aplicable';
            this.inspeccion  = this.arrayAnormalidades[this.index].Inspeccion == 1 ? 'Sí' : 'No';
            this.informativo = this.arrayAnormalidades[this.index].Informativo == 1 ? 'Sí' : 'No';

            this.nextDisabled          = false;
            this.nextEndDisabled       = false;
            this.previousDisabled      = true;
            this.previousStartDisabled = true;
        },
        limpiar(){
            this.buscar = '';
            this.tipo = 'Nombre';
            this.listarAnormalidades(this.tipo, this.buscar, this.DataBaseAlias);
        }
    },

    created(){
        this.listarAnormalidades(this.tipo, this.buscar, this.DataBaseAlias);
    },

    components:{
        'NavBar': NavBar
    },

  }