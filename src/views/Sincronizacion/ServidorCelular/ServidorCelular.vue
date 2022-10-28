<template>
    <div>
        <NavBar></NavBar>
        
        <div class="container my-2">
            <div class="card">
                <div class="card-header text-center sticky-header">
                    <h5> <b> Servidor a Móvil </b> </h5>
                    <h6> <b> {{ usuario }}</b> </h6>
                </div>
                <b-overlay :show="show" class="d-inline-block">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-borderless table-sm caption-top">
                                <!-- <caption> <b> Clientes Pendientes </b> </caption> -->
                                <thead class="sticky-header">
                                    <tr class="text-center bg-primary">
                                        <th style="white-space:nowrap"></th>
                                        <th style="white-space:nowrap">Z - R</th>
                                        <th style="white-space:nowrap">LECT</th>
                                        <th style="white-space:nowrap">PEND</th>
                                    </tr>
                                </thead>
                                <tbody v-for="(item, index) in arraryPlanillas" :key="item.id_genfact">
                                    <tr>
                                        <td style="white-space:nowrap" class="text-center">
                                            <input class="form-check-input" type="checkbox" :value="item.id_genfact" v-model="idPlanilla">
                                        </td>
                                        <td v-b-toggle="'collapse' + index" style="white-space:nowrap" align="right"> {{ item.zonaruta }} </td>
                                        <td v-b-toggle="'collapse' + index" style="white-space:nowrap" align="right"> {{ item.lecturados }} </td>
                                        <td v-b-toggle="'collapse' + index" style="white-space:nowrap" align="right"> {{ item.pendiente }} </td>
                                    </tr>
                                    <tr>
                                        <td colspan="5">
                                            <b-collapse v-bind:id="'collapse' + index" class="mt-2 acordeon">
                                                <b-card>
                                                    <b> Planilla de Lecturación: </b> {{ item.id_genfact }} <br>
                                                    <b> Cobro: </b> {{ item.cobro }} <br>
                                                    <b> Fecha: </b> {{ formatoFecha(item.fecha) }} <br>
                                                    <b> Total Anormalidad: </b> {{ item.totalanormalidad }} <br>
                                                    <b> Total Rutas: </b> {{ item.totalruta }}
                                                </b-card>
                                            </b-collapse>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- INICIO DE LA PAGINACION --
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
                        !-- FIN DE LA PAGINACION -->

                        <b-modal centered id="modal-sincronizacion">
                            <template #modal-header="{ close }">
                                <b-button hidden variant="outline-danger" @click="close()">
                                    Cerrar
                                </b-button>

                                <h5 :class="'text-'+color"> {{header}} </h5>
                            </template>

                            <h5 class="text-black"> {{message}} </h5>

                            <template #modal-footer="{ cancel }">
                                <b-button block :variant="'outline-'+color" @click="cancel()">
                                    Aceptar
                                </b-button>
                            </template>
                        </b-modal>

                    </div>

                </b-overlay>
            </div>
        </div>

        <footer class="bg-light fixed-bottom">
            <!-- Copyright -->
            <div class="text-center p-3">
                <div class="d-grid gap-2">
                    <b-button variant="success" @click="WMSincronizacionBDListDemo()"> Sincronizar </b-button>
                    <b-button @click="$router.go(-1)" variant="danger"> Volver </b-button>
                </div>
            </div>
            <!-- Copyright -->
        </footer>

    </div>
</template>

<script src="@/Servicios/ServidorMovil.js"></script>