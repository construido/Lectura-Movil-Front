<template>
    <div>
        <NavBar></NavBar>
        
        <div class="container my-1">
            <div class="card">
                <div class="card-header">
                    <div class="col-xl-6">
                        <div class="centroBotones">
                            <h5> Lecturador: {{NombreUsuario}} {{ApellidoUsuario}} </h5>
                        </div>
                    </div>
                </div>
                <b-overlay :show="show" class="d-inline-block">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xl-12 col-md-12 col-sm-12 col-lg-12" >

                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped table-borderless table-sm caption-top">
                            <caption> <b> Lecturas Pendientes </b> </caption>
                                <thead>
                                    <tr class="text-center bg-primary">
                                        <th style="white-space:nowrap">ACCIONES</th>
                                        <th style="white-space:nowrap">ZONA</th>
                                        <th style="white-space:nowrap">COBRO</th>
                                        <th style="white-space:nowrap">FECHA</th>
                                    </tr>
                                </thead>
                                <tbody v-for="(item, index) in arrayFacturas" :key="item.GeneracionFactura">
                                    <tr>
                                        <td style="white-space:nowrap" class="text-center">
                                            <b-button class="btn btn-success btn-sm" @click="listarClientes(item.GeneracionFactura)"> 
                                                <b-icon icon="arrow-right-square" aria-hidden="true"></b-icon>
                                            </b-button>
                                            <b-button v-b-toggle="'collapse' + index" title="Ver más" class="btn-sm mx-1" variant="primary" >
                                                <b-icon icon="eye" aria-hidden="true"></b-icon> 
                                            </b-button>
                                        </td>

                                        <th hidden scope="row" class="text-center"> {{ index + 1 }} </th>
                                        <td style="white-space:nowrap" v-if="item.Zona < 9 && item.Ruta < 9" align="right"> 0{{ item.Zona }}0{{ item.Ruta }} </td>
                                        <td style="white-space:nowrap" v-else-if="item.Zona < 9" align="right"> 0{{ item.Zona }}{{ item.Ruta }} </td>
                                        <td style="white-space:nowrap" v-else-if="item.Ruta < 9" align="right"> {{ item.Zona }}0{{ item.Ruta }} </td>
                                        <td style="white-space:nowrap" v-else align="right"> {{ item.Zona }}{{ item.Ruta }} </td>
                                        <td style="white-space:nowrap" align="right"> {{ item.Cobro}} </td>
                                        <td style="white-space:nowrap" align="right"> {{ item.FechaGeneracionLectura }} </td>
                                    </tr>
                                    <tr>
                                        <td colspan="5">
                                            <b-collapse v-bind:id="'collapse' + index" class="mt-2 acordeon">
                                                <b-card>
                                                    <b> Planilla de Lecturación: </b> {{ item.GeneracionFactura }} <br>
                                                    <b> Fecha de Creación: </b> {{ item.FechaGeneracionFactura }} <br>
                                                    <b> Lecturados: </b> {{ item.Lecturados }} <br>
                                                    <b> Pendientes: </b> {{ item.Pendientes }}
                                                </b-card>
                                            </b-collapse>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- INICIO DE LA PAGINACION -->
                        <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-center mt-2">
                                <li class="page-item prev-item" v-if="pagination.current_page > 1">
                                    <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page - 1)">
                                        <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
                                    </a>
                                </li>

                                <li class="page-item" v-for="page in pagesNumber" :key="page" :class="[page == isActived ? 'active' : '']" aria-current="page">
                                    <a class="page-link" href="#" @click.prevent="cambiarPagina(page)" v-text="page"></a>
                                </li>
                                
                                <li class="page-item next-item" v-if="pagination.current_page < pagination.last_page">
                                    <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page + 1)">
                                        <b-icon icon="arrow-right" aria-hidden="true"></b-icon>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <!-- FIN DE LA PAGINACION -->

                    </div>
                </b-overlay>
            </div>
        </div><br><br><br>

        <BtnAtras></BtnAtras>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import BtnAtras from '@/components/BtnAtras.vue'

export default {
    name: 'LecturaPendiente',
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
            this.axios.post('/admin/listarPlanillaDeLecturasPendientes?page='+page+'&DataBaseAlias='+this.DataBaseAlias+'&Plomero='+this.Plomero)
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
          this.$router.push('/lecturacion/clientependiente/'+id)
        },
    },
}
</script>