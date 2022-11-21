<template>
    <div id="app">
        <NavBar></NavBar>

        <div class="container my-2" style="overflow: auto;">
            <div class="card">
                <div class="card-header">
                    <div class="col-xl-6">
                        <div class="text-center">
                            <h5> <b> Lecturación [{{lecturados}}/{{pendientes}}]</b> 
                                <!-- <b-button class="btn btn-sm mx-1" :variant="HI" @click="habilitarImpresora">
                                    <b-icon icon="printer-fill" scale="1" color="black"></b-icon>
                                </b-button>
                                <b-button class="btn btn-sm" :variant="HG" @click="habilitarGPS">
                                    <b-icon icon="geo-alt-fill" scale="1" color="black"></b-icon>
                                </b-button> -->
                            </h5>
                        </div>
                    </div>
                </div>
                <b-overlay :show="show" class="d-inline-block">
                    <div class="card-body">
                        <b> Código Ubicación: </b> {{ codigoUbicacion }} <br>
                        <b> Nombre: </b> {{ nombreCliente }} <br>
                        <b> Media: </b> {{ media }} <br>

                        <div v-if="corte==0">
                            <b> Corte: </b> No
                        </div>
                        <div v-else>
                            <b> Corte: </b> Sí
                        </div>

                        <div v-if="conMedidor == true">
                            <div class="form-floating">
                                <input :disabled="habilitar" readonly type="number" class="form-control" v-model="lecturaAnterior">
                                <label for="lecturaanterior">Lectura Anterior:</label>
                            </div>
                            <div class="form-floating my-1">
                                <input type="number" :class="[camposObligatorios.tcLecturaActual ? 'form-control is-invalid' : 'form-control']" 
                                    placeholder="Lectura Actual" v-model="lecturaActual" @focus="inputFocus" id="input">
                                <label for="lecturaactual">Lectura Actual:</label>
                                <span v-if="camposObligatorios.tcLecturaActual" v-text="camposObligatorios.tcLecturaActual[0]" class="text-danger"></span>
                            </div>

                            <div>
                                <b-card no-body>
                                    <b-tabs card>
                                        <b-tab title="Anormalidad 1" active>
                                            <b-card-text>
                                                <b-input-group class="my-sm-0">
                                                    <b-form-input readonly type="text" placeholder="CodUbi - Cliente - Nombre" v-model="anormalidad"></b-form-input>
                                                    <b-button @click="modalAnormalidad(1)" variant="primary"><b-icon icon="search"></b-icon></b-button>
                                                </b-input-group>
                                            </b-card-text>
                                        </b-tab>
                                        <b-tab title="Anormalidad 2">
                                            <b-card-text>
                                                <b-input-group class="my-sm-0">
                                                    <b-form-input readonly type="text" placeholder="CodUbi - Cliente - Nombre" v-model="anormalidad2"></b-form-input>
                                                    <b-button @click="modalAnormalidad(2)" variant="primary"><b-icon icon="search"></b-icon></b-button>
                                                </b-input-group>
                                            </b-card-text>
                                        </b-tab>
                                    </b-tabs>
                                </b-card>
                            </div>
                        </div>

                        <div v-else>
                            <textarea readonly class="form-control text-center py-5" name="" id="" rows="1"> SIN MEDIDOR </textarea>
                        </div>                        

                        <div class="form-group col-12">
                            <hr>
                        </div>

                        <!-- PARA OBTENER LAS IMAGENES -- INICIO -->
                        <div class="form-floating my-1">
                            <form enctype="multipart/form-data">
                                <div>
                                    <input type="file" accept="image/*" class="form-control" id="file" multiple @change="obtenerImagen" required>
                                </div>
                            </form>
                        </div>
                        <!-- PARA OBTENER LAS IMAGENES -- FIN -->

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
                <h5 class="text-danger">Error</h5>
            </template>

            <div class="table-responsive">
                <table class="table table-striped table-borderless table-sm caption-top">
                    <caption class="text-center"> <h5><b> Tipo de Consumo no compatible </b></h5> </caption>
                    <tbody>
                        <tr>
                            <td width="50%" align="right"> <b>Categoria:</b> </td>
                            <td width="50%" align="left"> {{CategoriaE}} </td>
                        </tr>
                        <tr>
                            <td align="right"> <b>Lectura Anterior:</b> </td>
                            <td align="left"> {{LecturaAnteriorE}} </td>
                        </tr>
                        <tr>
                            <td align="right"> <b>Lectura Actual:</b> </td>
                            <td align="left"> {{LecturaActualE}} </td>
                        </tr>
                        <tr>
                            <td align="right"> <b>Consumo:</b> </td>
                            <td align="left"> {{ConsumoActualE}} </td>
                        </tr>
                        <tr>
                            <td align="right"> <b>Media:</b> </td>
                            <td align="left"> {{MediaE}} </td>
                        </tr>
                        <tr>
                            <td align="right"> <b>Medidor Marca:</b> </td>
                            <td align="left"> {{MedidorMarcaE}} </td>
                        </tr>
                        <tr>
                            <td align="right"> <b>Medidor Numero:</b> </td>
                            <td align="left"> {{MedidorNumeroE}} </td>
                        </tr>
                        <tr>
                            <td align="right"> <b>Medidor Serie:</b> </td>
                            <td align="left"> {{MedidorSerieE}} </td>
                        </tr>
                        <tr>
                            <td align="right"> <b>Fin Medidor:</b> </td>
                            <td align="left"> {{FinMedidorE}} </td>
                        </tr>
                        <tr>
                            <td align="right"> <b>Desviacion:</b> </td>
                            <td align="left"> {{ (Math.round((PorcentajeDesviacionE + Number.EPSILON) * 100) / 100) }} </td>
                        </tr>
                        <tr>
                            <td align="right"> <b>Tipo Consumo:</b> </td>
                            <td align="left"> {{TipoConsumoE}} </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <template #modal-footer="{ ok }">
                <b-button block variant="outline-success" @click="ok()">
                    Aceptar
                </b-button>
            </template>
        </b-modal>

        <!-- INICIO - MODAL GUARDADO EXITOSO -->
        <b-modal centered id="modal-seguir">
            <b-overlay :show="show2" no-wrap></b-overlay>
            <template #modal-header="{ close }">
                <b-button hidden variant="outline-danger" @click="close()">
                    Cerrar
                </b-button>

                <h5 class="text-success">Guardado Correctamente!</h5>
            </template>

            <h5 class="text-black">Desea Imprimir ??</h5>
            <template #modal-footer="{ cancel }">
                <b-button block variant="outline-success" @click="RecalcularFactura()">
                    Aceptar
                </b-button>

                <b-button hidden variant="outline-danger" @click="cancel()">
                    Cancelar
                </b-button>

                <b-button variant="outline-danger" @click="CancelarImpresion()">
                    Cancelar
                </b-button>
            </template>
        </b-modal>
        <!-- FIN - MODAL GUARDADO EXITOSO -->

        <!-- INICIO - MODAL GUARDADO EXITOSO -->
        <b-modal centered id="modal-sin-factura">
            <template #modal-header="{ close }">
                <b-button hidden variant="outline-danger" @click="close()">
                    Cerrar
                </b-button>

                <h5 class="text-danger">Error!</h5>
            </template>

            <h5 class="text-black"> {{messageAlerta}} </h5>

            <template #modal-footer="{ cancel }">
                <b-button block variant="outline-danger" @click="CancelarImpresion()">
                    Aceptar
                </b-button>

                <b-button hidden variant="outline-danger" @click="cancel()">
                    Cancelar
                </b-button>
            </template>
        </b-modal>
        <!-- FIN - MODAL GUARDADO EXITOSO -->

        <!-- INICIO - MODAL SIN CLIENTE A LECTURAR -->
        <b-modal centered id="modal-sin-cliente">
            <template #modal-header="{ close }">
                <b-button hidden variant="outline-success" @click="close()">
                    Cerrar
                </b-button>

                <h5 class="text-success"> <b-icon icon="check-square" scale="2" variant="success mx-2"></b-icon> Satisfactorio..! </h5>
            </template>

            <h5 class="text-black"> Planilla terminada..! </h5>

            <template #modal-footer="{ cancel }">
                <b-button block variant="outline-success" @click="$router.go(-2)">
                    Aceptar
                </b-button>

                <b-button hidden variant="outline-success" @click="cancel()">
                    Cancelar
                </b-button>
            </template>
        </b-modal>
        <!-- FIN - MODAL SIN CLIENTE A LECTURAR -->

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
                        <b-form-input type="text" placeholder="Regla - Nombre - Tipo Consumo" v-model="dato"></b-form-input>
                        <b-button v-if="mostrar" @click="listarAnormalidad(1)" variant="primary"><b-icon icon="search"></b-icon></b-button>
                        <b-button v-else @click="limpiarCampos" variant="danger"><b-icon icon="x" aria-hidden="true"></b-icon></b-button>
                    </b-input-group>
                    <select class="form-control my-2" v-model="tipo" @change="mostrarBtn">
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
        
        <!-- <div>
            <h1>Mis Coordenadas</h1>

            <p> Latitud: {{ coor.lat }} </p>
            <p> Longitud: {{ coor.lng }} </p>
        </div> -->

        <footer class="bg-light fixed-bottom">
            <!-- Copyright -->
            <div class="text-center p-3">
                <div class="d-grid gap-2">
                    <b-button variant="success" @click="guardarLectura()"> Guardar </b-button>
                    <b-button @click="$router.go(-1)" variant="danger"> Volver </b-button>
                </div>
            </div>
            <!-- Copyright -->
        </footer>

    </div>
</template>

<script src="@/Servicios/LecturaCliente.js"></script>
