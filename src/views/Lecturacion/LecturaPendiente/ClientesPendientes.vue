<template>
    <div id="app">
        <!-- <NavBar></NavBar> -->

        <!-- NavBar - INICIO -->
        <div class="sticky-top">
            <b-navbar toggleable="md" type="dark" variant="primary">
                <b-container>
                    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                    <b-navbar-brand class="mx-auto" href="#">LecturaMovil - {{EmpresaNombre}} </b-navbar-brand>

                    <!-- Buscador - INICIO -->
                    <!-- <div style="text-align:center; color: white;" class="mt-2">
                        <label for="" >ESTABLECER ANORMALIDAD</label>
                    </div> -->

                    <select class="form-select my-2" v-model="tipo">
                        <option value="LecturaPendiente">Buscar por: Lectura Pendiente</option>
                        <option value="MedidorAnormalidad">Buscar por: Otra Anormalidad</option>
                    </select>

                    <b-input-group class="my-sm-0">
                        <b-button @click="listarLecturas()" variant="info"><b-icon icon="search"></b-icon></b-button>
                        <b-form-input type="text" placeholder="Busqueda de Anormalidad" v-model="buscar"></b-form-input>
                        <b-button @click="modalAnormalidad()" variant="info"><b-icon icon="droplet-half"></b-icon></b-button>
                    </b-input-group>
                    <!-- Buscador - FIN -->

                    <!-- Item´s - INICIO -->
                    <b-collapse is-nav id="nav_collapse">
                        <b-navbar-nav>
                            <b-nav-item :to="{name: 'Home'}" exact-active-class="active">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                    <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                                </svg> Inicio
                            </b-nav-item>
                            <b-nav-item :to="{name: 'About'}" exact-active-class="active">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                                </svg> Acerca de
                            </b-nav-item>
                        </b-navbar-nav>
                    </b-collapse>
                    <!-- Item´s - FIN -->

                </b-container>
            </b-navbar>
        </div>
        <!-- NavBar - FIN -->

        <div class="container my-2">
            <div class="card">
                <div class="card-header text-center sticky-header">
                    <h5> <b> Lecturas Procesadas [{{lecturados}}/{{pendientes}}] </b> </h5>
                    <!-- <h6> <b> ZonaRuta: {{ zona }}{{ ruta }} </b> </h6> -->
                </div>
                <b-overlay :show="show" class="d-inline-block">
                    <div class="card-body" v-if="arrayLecturas.length > 0">
                        <div class="table-responsive">
                            <table class="table table-striped table-borderless table-sm caption-top">
                                <!-- <caption> <b> Clientes Pendientes </b> </caption> -->
                                <thead class="sticky-header">
                                    <tr class="text-center bg-primary">
                                        <th style="white-space:nowrap">ACCIONES</th>
                                        <th style="white-space:nowrap">COD. UBI.</th>
                                        <th style="white-space:nowrap">CLIENTE</th>
                                        <th style="white-space:nowrap">LEC ANT</th>
                                    </tr>
                                </thead>
                                <tbody v-for="(item, index) in arrayLecturas" :key="item.Cliente">
                                    <tr>
                                        <td style="white-space:nowrap" class="text-center">
                                            <b-button title="Editar Usuario" class="btn btn-success btn-sm mx-1" 
                                                @click="lecturarCliente(item.GeneracionFactura, item.Cliente)"> 
                                                <b-icon icon="arrow-right-square" aria-hidden="true"></b-icon> 
                                            </b-button>
                                            <b-button v-b-toggle="'collapse' + index" title="Ver más" class="btn-sm mx-1" variant="primary" >
                                                <b-icon icon="eye" aria-hidden="true"></b-icon> 
                                            </b-button>
                                            <b-button title="Editar Usuario" class="btn btn-info btn-sm mx-1" 
                                                @click="RecalcularFactura(item.GeneracionFactura, item.Cliente, item.Cobro, item.CodUbi)">
                                                <b-icon icon="printer" aria-hidden="true" color="white"></b-icon>
                                            </b-button>
                                        </td>

                                        <th hidden scope="row" class="text-center"> {{ index + 1 }} </th>
                                        <td style="white-space:nowrap" align="right"> {{ item.CodigoUbicacion }} </td>
                                        <td style="white-space:nowrap" align="right"> {{ item.Cliente }} </td>
                                        <td style="white-space:nowrap" align="right"> {{ item.LecturaAnterior }} </td>
                                    </tr>
                                    <tr>
                                        <td colspan="5">
                                            <b-collapse v-bind:id="'collapse' + index" class="mt-2 acordeon">
                                                <b-card>
                                                    <b> Planilla de Lecturación: </b> {{ item.GeneracionFactura }} <br>
                                                    <b> Nombre: </b> {{ item.Nombre }} <br>
                                                    <div v-if="item.NombreMarcaMedidor">
                                                        <b > Marca Medidor: </b> {{ item.NombreMarcaMedidor }} <br>
                                                    </div>
                                                    <div v-else>
                                                        <b> Marca Medidor: </b> Sin Marca <br>
                                                    </div>
                                                    <div v-if="item.NumeroSerie">
                                                        <b> Medidor: </b> {{ item.NumeroSerie }} - {{ item.Numero }} <br>
                                                    </div>
                                                    <div v-else>
                                                        <b> Medidor: </b> Sin Medidor <br>
                                                    </div>
                                                    <b> Media: </b> {{ item.Media }} / M3 <br>
                                                    <b> Categoria: </b> {{ item.NombreCategoria }} <br>
                                                    <b> Consumo: </b> {{ item.Consumo }} <br>
                                                    <b> Lectura Actual: </b> {{ item.LecturaActual }} <br>
                                                    <b> Consumo Facturado: </b> {{ item.ConsumoFacturado }} <br>
                                                    <b> Anormalidad: </b> {{ item.NombreTC }} - {{ item.NombreAnormalidad }} - {{ item.MedidorAnormalidad }} <br>
                                                    <b> Anormalidad 2: </b> {{ item.N2 }} - {{ item.NA2 }} - {{ item.MedidorAnormalidad2 }}
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

                    <div class="card-body text-center" v-else>
                        <b>Sin Clientes!</b>
                    </div>

                </b-overlay>
            </div>
        </div><br><br><br>

        <b-modal centered id="modal-sin-factura">
            <template #modal-header="{ close }">
                <b-button hidden variant="outline-danger" @click="close()">
                    Cerrar
                </b-button>

                <h5 class="text-danger">Error!</h5>
            </template>

            <h5 class="text-black"> {{messageAlerta}} </h5>

            <template #modal-footer="{ cancel }">
                <b-button block variant="outline-danger" @click="cancel()">
                    Aceptar
                </b-button>
            </template>
        </b-modal>

        <!-- INICIO - MODAL ANORMALIDADES -->
        <b-modal centered id="modal-anormalidad">
            <template hidden #modal-header="{ close }">
                <b-button hidden variant="outline-danger" @click="close()">
                    Cerrar
                </b-button>

                <h5 class="text-black">Busqueda de Anormalidades!</h5>
            </template>

            <select class="form-control" v-model="orden" @change="select">
                <option value="top10">Top 10 Anormalidades</option>
                <option value="ASC">Por Nombre Ascendente</option>
                <option value="DESC">Por Nombre Descendente</option>
            </select>
            <b-input-group class="my-2 my-sm-0">
                <b-form-input type="text" placeholder="Regla - Nombre - Tipo Consumo" v-model="dato2"></b-form-input>
                <b-button v-if="mostrar" @click="listarAnormalidad(1)" variant="primary"><b-icon icon="search"></b-icon></b-button>
                <b-button v-else @click="limpiarCampos" variant="danger"><b-icon icon="x" aria-hidden="true"></b-icon></b-button>
            </b-input-group>
            <select class="form-control my-2" v-model="tipo2" @change="mostrarBtn">
                <option value="Regla">Por Regla</option>
                <option value="Nombre">Por Nombre</option>
                <option value="TipoConsumo">Por Tipo Consumo</option>
            </select>
            <div class="table-responsive">
                <table class="table table-bordered table-hover table-sm">
                    <thead class="sticky-header">
                        <tr class="text-center bg-primary">
                            <th style="white-space:nowrap">ACCIÓN</th>
                            <th style="white-space:nowrap">NOMBRE ANORMALIDAD</th>
                        </tr>
                    </thead>
                    <tbody v-for="(item, index) in arrayAnormalidades" :key="item.MedidorAnormalidad">
                        <tr>
                            <td style="white-space:nowrap">
                                <b-button @click="cargarAnormalidad(item)" title="Editar Usuario" class="btn btn-success btn-sm mx-1"> 
                                    <b-icon icon="arrow-right-square" aria-hidden="true"></b-icon> 
                                </b-button>
                                <b-button v-b-toggle="'collapse' + index" title="Ver más" class="btn-sm mx-1" variant="primary" >
                                    <b-icon icon="eye" aria-hidden="true"></b-icon> 
                                </b-button>
                            </td>
                            <td hidden align="right"> </td>
                            <td hidden align="left"> </td>
                            <td style="white-space:nowrap"> {{ item.NombreAnormalidad }} </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <b-collapse v-bind:id="'collapse' + index" class="mt-2 acordeon">
                                    <b-card>
                                        <b> Anormalidad: </b> {{ item.MedidorAnormalidad }} - {{ item.NombreAnormalidad }} <br>
                                        <b> Tipo Consumo: </b> {{ item.Nombre }} <br>
                                        <b> Regla: </b> {{ item.Regla }} - {{ item.NombreL }}
                                    </b-card>
                                </b-collapse>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <b-overlay :show="show2" no-wrap></b-overlay>
            <!-- INICIO PAGINACIÓN -->
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center mt-2">
                    <li class="page-item prev-item" v-if="pagination2.current_page > 1">
                        <a class="page-link" href="#" @click.prevent="cambiarPagina2(pagination2.current_page - 1)">
                            <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
                        </a>
                    </li>

                    <li class="page-item" v-for="page in pagesNumber2" :key="page" :class="[page == isActived2 ? 'active' : '']" aria-current="page">
                        <a class="page-link" href="#" @click.prevent="cambiarPagina2(page)" v-text="page"></a>
                    </li>
                    
                    <li class="page-item next-item" v-if="pagination2.current_page < pagination2.last_page">
                        <a class="page-link" href="#" @click.prevent="cambiarPagina2(pagination2.current_page + 1)">
                            <b-icon icon="arrow-right" aria-hidden="true"></b-icon>
                        </a>
                    </li>
                </ul>
            </nav>
            <!-- FIN PAGINACIÓN -->

            <template #modal-footer="{ cancel }">
                <b-button hidden block variant="outline-success" @click="ok()">
                    Seleccionar
                </b-button>

                <b-button variant="danger" @click="cancel()">
                    Cancelar
                </b-button>
            </template>
        </b-modal>
        <!-- FIN - MODAL ANORMALIDADES -->

        <BtnAtras></BtnAtras>
    </div>
</template>

<script src="@/Servicios/ClientesPendientes.js"></script>