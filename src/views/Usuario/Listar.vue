<template>
 <div id="app">
   
      <NavBar></NavBar>

    <div class="container">
      <div class="card">
        <div class="card-header">
            <div class="col-xl-6">
                <div class="centroBotones">
                    <router-link title="Registrar Usuario" class="btn btn-success" to="/usuario/registrar">Registrar</router-link>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-xl-12 col-md-12 col-sm-12 col-lg-12" >
                    <b-input-group class="mb-2">
                      <b-button @click="listarUsuario(buscar)" variant="info"><b-icon icon="search"></b-icon></b-button>
                      <b-form-input v-model="buscar" type="text" placeholder="Buscar"></b-form-input>
                        <b-button @click="limpiarBuscador()" variant="danger"><b-icon icon="x" aria-hidden="true"></b-icon></b-button>
                    </b-input-group>

                    <b-alert :show="dismissCountDown" :variant="mensaje.color" 
                      @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
                      {{ mensaje.texto }}
                    </b-alert>
                </div>
            </div>
          <div class="table-responsive">
            <table class="table table-striped table-borderless table-sm caption-top">
              <caption> <b> Lista de Usuarios </b> </caption>
              <thead>
                <tr class="text-center bg-primary">
                  <th scope="col">#</th>
                  <th>NOMBRE</th>
                  <th>APELLIDOS</th>
                  <th>LOGIN</th>
                  <th hidden>CORREO</th>
                  <th hidden>ESTADO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody v-for="(item, index) in datosPaginados" :key="item.Usuario">
                <tr v-b-toggle="'collapse' + index">
                  <th scope="row" class="text-center"> {{ index + 1 }} </th>
                  <th hidden scope="row" class="text-center"> {{ item.Usuario }} </th>
                  <td> {{ item.Nombre }} </td>
                  <td> {{ item.Apellidos }} </td>
                  <td> {{ item.Login }} </td>
                  <td hidden> {{ item.Correo }} </td>

                  <td hidden>
                      <div v-if="item.Estado == 1" class="text-success" >
                          <span>Activado</span>
                      </div>
                      <div v-else class="text-danger">
                          <span>Desactivado</span>
                      </div>
                  </td>

                  <td style="white-space:nowrap" class="text-center">
                    <b-button title="Editar Usuario" class="btn-sm mx-1" variant="warning" @click="editar(item.Usuario)"> 
                      <b-icon icon="pencil" aria-hidden="true"></b-icon> 
                    </b-button>
                    <!-- <b-button title="Eliminar Usuario" class="btn-sm" @click="cargarEstado(item.Estado, item.Usuario)" data-bs-toggle="modal" data-bs-target="#exampleModal" variant="danger"> 
                      <b-icon icon="trash" aria-hidden="true"></b-icon> 
                    </b-button> -->
                    <b-button title="Eliminar Usuario" class="btn-sm" @click="cargarEstado(item.Estado, item.Usuario)" variant="danger" id="show-btn">
                      <b-icon icon="trash" aria-hidden="true"></b-icon>
                    </b-button>
                  </td>
                </tr>
                <tr>
                  <td colspan="5">
                    <b-collapse v-bind:id="'collapse' + index" class="mt-2 acordeon">
                      <b-card>
                        Correo: {{ item.Correo }} <br>
                        Fecha Creación: {{ item.FechaCreacion }}
                      </b-card>
                    </b-collapse>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- INICIO DE LA PAGINACION -->
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center pagination-sm">
              <li class="page-item" v-on:click="paginaAnterior()">
                <a class="page-link" href="#">
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only"></span>
                </a>
              </li>
              <li v-for="paginas in totalPaginas()" :key="paginas" v-on:click="cargarPagina(paginas)" 
                  class="page-item" v-bind:class="activo(paginas)"><a class="page-link" href="#"> {{ paginas }} </a>
              </li>
              <li class="page-item" v-on:click="paginaSiguiente()">
                <a class="page-link" href="#">
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only"></span>
                </a>
              </li>
            </ul>
          </nav>
          <!-- FIN DE LA PAGINACION -->
        </div>
      </div>
    </div><br>
    <!-- FIN LISTA DE USUARIO-->

    <!-- INICIO MODAL ESTADO-->
    <!-- <div class="modal fade" id="exampleModal" name="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Cambiar Estado</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <input hidden type="number" v-model="id">
              <select class="form-control" name="estado" id="estado" v-model="estado">
                  <option value="1">Activo</option>
                  <option value="2">Pendiente Activar</option>
                  <option value="3">Pasivo</option>
                  <option value="4">Baja Definitiva</option>
                  <option value="5">Usuario Prueba</option>
              </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="cambiarEstado()">Guardar</button>
          </div>
        </div>
      </div>
    </div> -->
    <!-- FIN MODAL ESTADO -->

    <!-- INICIO MODAL ESTADO-->
    <div>
      <b-modal ref="my-modal" hide-footer title="Cambiar Estado">
        <div class="d-block text-center">
          <input hidden type="number" v-model="id">
            <select class="form-control" name="estado" id="estado" v-model="estado">
                <option value="1">Activo</option>
                <option value="2">Pendiente Activar</option>
                <option value="3">Pasivo</option>
                <option value="4">Baja Definitiva</option>
                <option value="5">Usuario Prueba</option>
            </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="hideModal">Cerrar</button>
          <button type="button" class="btn btn-primary" @click="cambiarEstado()">Guardar</button>
        </div>
        <!-- <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button> -->
      </b-modal>
    </div>
    <!-- FIN MODAL ESTADO -->

  </div>
</template>

<style>
  tr.hide-table-padding td {
  padding: 0;
}

.expand-button {
	position: relative;
}

.accordion-toggle .expand-button:after
{
  position: absolute;
  left:.75rem;
  top: 50%;
  transform: translate(0, -50%);
  content: '-';
}
.accordion-toggle.collapsed .expand-button:after
{
  content: '+';
}
</style>

<script>
import NavBar from '../../components/NavBar.vue' 
export default {
    name : 'Listar',
    data() {
      return {
        arrayUsuario: [],
        buscar:'',
        dismissSecs: 3,
        dismissCountDown: 0,
        mensaje: {color: '', texto: ''},
        estado: '',
        id: '',

        // PAGINACIÓN
        elementosPorPagina: 10,
        datosPaginados: [],
        paginaActual: 1,
      }
    },
    components:{
        'NavBar': NavBar
    },
    created(){
      this.listarUsuario(this.buscar);
    },
    methods:{
      showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      cargarEstado(estado, user){
          this.estado = estado;
          this.id = user;
          this.showModal();
      },
      totalPaginas(){
        return Math.ceil(this.arrayUsuario.length / this.elementosPorPagina);
      },
      cargarPagina(nPagina){
        this.paginaActual = nPagina;
        this.datosPaginados = [];
        let ini = (nPagina * this.elementosPorPagina) - this.elementosPorPagina;
        let fin = (nPagina * this.elementosPorPagina);

        this.datosPaginados = this.arrayUsuario.slice(ini, fin);
      },
      paginaAnterior(){
        if (this.paginaActual > 1) {
          this.paginaActual--;
        }
        this.cargarPagina(this.paginaActual);
      },
      paginaSiguiente(){
        if (this.paginaActual < this.totalPaginas()) {
          this.paginaActual++;
        }
        this.cargarPagina(this.paginaActual);
      },
      activo(nPagina){
        return nPagina == this.paginaActual ? 'active' : '';
      },
      editar(id){
          this.$router.push('/usuario/editar/'+id)
          // this.$router.push('/usuario/editar/'+id+'/'+552)
      },
      listarUsuario(buscar){
        this.axios.post('/admin/getUsuarios?tcNombre='+buscar)
          .then(res => {
            console.log(res);
            this.arrayUsuario = res.data.values;
            this.cargarPagina(1);
          })
          .catch(e => {
            this.arrayUsuario = [];
            console.log(e.response);
          })
      },
      cambiarEstado(){
        this.axios.put('/updateEstado', {
            'tnUsuario': this.id,
            'tnEstado' : this.estado,
        }).then(res => {
            console.log(res.data);
            this.listarUsuario(this.buscar)
            this.hideModal();

            // var myModalEl = document.getElementById('exampleModal')
            // myModalEl.addEventListener('hidden.bs.modal', function () {
            //     myModalEl.hide()
            // })

            this.mensaje.color = 'success';
            this.mensaje.texto = 'Actualizado correctamente';
            this.showAlert();

        }).catch(e => {
            console.log(e.response);
            // this.camposObligatorios = this.controlErrores(e);
        })
      },
      limpiarBuscador(){
          this.buscar = '';
          this.listarUsuario(this.buscar);
      },
      countDownChanged(dismissCountDown) {
          this.dismissCountDown = dismissCountDown
        },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      },
    }
}
</script>