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
                    <b-input-group class="my-2 my-sm-0">
                        <b-button @click="listarLecturas()" variant="info"><b-icon icon="search"></b-icon></b-button>
                        <b-form-input type="text" placeholder="CodUbi - Cliente - Nombre" v-model="buscar"></b-form-input>
                        <b-button @click="limpiar()" variant="danger"><b-icon icon="x" aria-hidden="true"></b-icon></b-button>
                    </b-input-group>
                    
                    <select class="form-select" v-model="tipo">
                        <option value="Nombre">Buscar por: Nombre Cliente</option>
                        <option value="Codigo">Buscar por: Código Cliente</option>
                        <option value="Ubicacion">Buscar por: Código Ubicación ({{ zona }}{{ ruta }})</option>
                        <option value="UbicacionOtro">Buscar por: Código Ubicación (otro)</option>
                    </select>
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
                            <!-- <b-nav-item :to="{name: 'Listar'}" exact-active-class="active">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/> 
                                </svg> Usuarios
                            </b-nav-item> -->
                            <!-- <b-nav-item @click="Logout" exact-active-class="active"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                            </svg> Cerrar sesion
                            </b-nav-item> -->
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
                    <h5> <b> Lecturas Pendientes [{{lecturados}}/{{pendientes}}] </b> </h5>
                    <h6> <b> ZonaRuta: {{ zona }}{{ ruta }} </b> </h6>
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
                                                    <!-- <b> Planilla de Lecturación: </b> {{ index + 1 }} <br> -->
                                                    <b> Planilla de Lecturación: </b> {{ item.GeneracionFactura }} <br>
                                                    <b> Nombre: </b> {{ item.Nombre }} <br>
                                                    <div v-if="item.NombreMarcaMedidor">
                                                        <b> Marca Medidor: </b> {{ item.NombreMarcaMedidor }} <br>
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
                                                    <b> Media: </b> {{ item.Media }} / M3
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
                                <!-- <li class="page-item next" v-if="pagination.current_page > 1">
                                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="cambiarPagina(pagination.current_page)">
                                        <b-icon icon="box-arrow-in-left" aria-hidden="true"></b-icon>
                                    </a>
                                </li> -->

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
                                
                                <!-- <li class="page-item next" v-if="pagination.current_page < pagination.last_page">
                                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="cambiarPagina(pagination.last_page)">
                                        <b-icon icon="box-arrow-in-right" aria-hidden="true"></b-icon>
                                    </a>
                                </li> -->
                            </ul>
                        </nav>
                        <!-- FIN DE LA PAGINACION -->
                    </div>

                    <div class="card-body text-center" v-else>
                        <b>Cliente {{buscar}} no existe..!</b>
                    </div>

                </b-overlay>
            </div>
        </div><br><br><br>

        <BtnAtras></BtnAtras>
    </div>
</template>

<script src="@/Servicios/ClientePendiente.js"></script>