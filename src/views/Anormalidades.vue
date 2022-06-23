<template>
    <div>
        <!-- <NavBar></NavBar> -->
        <div class="sticky-top" id="app">
            <b-navbar toggleable="md" type="dark" variant="primary">
                <b-container>
                    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                    <b-navbar-brand class="mx-auto" href="#">LecturaMovil - {{EmpresaNombre}} </b-navbar-brand>

                    <b-input-group class="my-2 my-sm-0">
                        <b-button @click="listarAnormalidades(tipo,buscar,DataBaseAlias)" variant="info"><b-icon icon="search"></b-icon></b-button>
                        <!-- <b-button @click="buscarAnormalidad(buscar)" variant="info"><b-icon icon="search"></b-icon></b-button> -->
                        <b-form-input type="text" placeholder="Nombre Anormalidad" v-model="buscar"></b-form-input>
                        <b-button @click="limpiar()" variant="danger"><b-icon icon="x" aria-hidden="true"></b-icon></b-button>
                    </b-input-group>

                    <select class="form-select" v-model="tipo">
                        <option value="Nombre">Buscar por: Nombre</option>
                        <option value="Codigo">Buscar por: Código</option>
                        <option value="TipoConsumo">Buscar por: Tipo Consumo</option>
                    </select>

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

                </b-container>
            </b-navbar>
        </div>

        <div class="container">
            <div class="card my-2">
                <div class="card-header text-center">
                    <h5> Anormalidad de Medidor 
                        <!-- <b-button class="mx-2" @click="limpiar()" variant="info">
                            <b-icon icon="arrow-clockwise" :animation="animation" aria-hidden="true"></b-icon>
                        </b-button> -->
                    </h5>
                </div>
                <b-overlay :show="show" class="d-inline-block">
                    <div class="card-body">
                        <div class="form-floating">
                            <input type="text" class="form-control" placeholder="código" disabled v-model="codigo">
                            <label for="codigo"> <b> Código: </b> </label>
                        </div>
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" placeholder="nombre" disabled v-model="nombre">
                            <label for="nombre"> <b> Nombre: </b> </label>
                        </div>
                        <div class="form-floating">
                            <input type="text" class="form-control" placeholder="tipo consumo" disabled v-model="tipoConsumo">
                            <label for="tipoConsumo"> <b> Tipo Consumo: </b> </label>
                        </div>
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" placeholder="regla" disabled v-model="regla">
                            <label for="regla"> <b> Regla: </b> </label>
                        </div>
                        <div class="form-floating my-2">
                            <input type="text" class="form-control" placeholder="inspección" disabled v-model="inspeccion">
                            <label for="inspeccion"> <b> Inspección: </b> </label>
                        </div>
                        <div class="form-floating">
                            <input type="text" class="form-control" placeholder="informativo" disabled v-model="informativo">
                            <label for="informativo"> <b> Informativo: </b> </label>
                        </div>
                    </div>
                </b-overlay>
            </div>
        </div>
        <br><br><br><br><br>

        <b-modal centered id="modal-scoped">
            <template #modal-header="{ close }">
                <b-button hidden variant="outline-danger" @click="close()">
                    Cerrar
                </b-button>
                <!-- <h5 class="text-danger"> <b-icon icon="x-circle" scale="2" variant="danger mx-2"></b-icon> Error</h5> -->
                <h5 class="text-danger"> <b-icon icon="x-octagon" scale="2" variant="danger mx-2"></b-icon> Error </h5>
            </template>

            <h5>La Anormalidad no existe</h5>

            <template #modal-footer="{ ok }">
                <b-button block variant="outline-success" @click="ok()">
                    Aceptar
                </b-button>
            </template>
        </b-modal>

        <b-modal centered id="modal-scoped-2">
            <template #modal-header="{ close }">
                <b-button hidden variant="outline-danger" @click="close()">
                    Cerrar
                </b-button>
                <!-- <h5 class="text-danger"> <b-icon icon="x-circle" scale="2" variant="danger mx-2"></b-icon> Error</h5> -->
                <h5 class="text-warning"> <b-icon icon="exclamation-triangle" scale="2" variant="warning mx-2"></b-icon> Advertencia </h5>
            </template>

            <h5>El Campo es obligatorio</h5>

            <template #modal-footer="{ ok }">
                <b-button block variant="outline-success" @click="ok()">
                    Aceptar
                </b-button>
            </template>
        </b-modal>

        <footer class="bg-light fixed-bottom">
            <!-- Copyright -->
            <div class="text-center p-3">
                    <div class="bg-info m-2">
                        <b-button class="mx-2" variant="info" @click="cargarPrimerValor()" :disabled="previousDisabled">
                            <b-icon icon="box-arrow-in-left" aria-hidden="true"></b-icon> </b-button>
                        <b-button class="mx-2" variant="info" @click="cargarValoresPrevious()" :disabled="previousDisabled">
                            <b-icon icon="arrow-left" aria-hidden="true"></b-icon> </b-button>
                        <b-button class="mx-2" variant="info" @click="cargarValoresSiguiente()" :disabled="nextDisabled">
                            <b-icon icon="arrow-right" aria-hidden="true"></b-icon> </b-button>
                        <b-button class="mx-2" variant="info" @click="cargarUltimoValor()" :disabled="nextDisabled">
                            <b-icon icon="box-arrow-in-right" aria-hidden="true"></b-icon> </b-button>
                    </div>
                <div class="d-grid gap-2">
                    <!-- <b-button @click="$router.go(0)" variant="primary"> ACTUALIZAR </b-button> -->
                    <b-button @click="$router.go(-1)" variant="danger"> Volver </b-button>
                </div>
            </div>
            <!-- Copyright -->
        </footer>

    </div>
</template>

<script src="@/Servicios/Anormalidades.js"></script>