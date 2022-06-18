function SessionExpirada(status){
    if (status == 403){
        delete localStorage.token;
        localStorage.removeItem('token');
        localStorage.removeItem('NombreUsuario');
        localStorage.removeItem('ApellidoUsuario');
        localStorage.removeItem('EmpresaNombre');
        localStorage.removeItem('DataBaseAlias');
        localStorage.removeItem('Plomero');
        localStorage.removeItem('Empresa');
        // this.$router.push('/');
    }
}

// var token = res.data.token.token; // esta variable obtiene el token enviado por el back // localStorage.getItem('token');
// function parseJwt (token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace('-', '+').replace('_', '/');
//     var payload = JSON.parse(window.atob(base64))
//     var Fecha_Expiracion = moment(payload.exp * 1000)
//     console.log('Fecha Expiracion: ' + Fecha_Expiracion._d)

//     var Fecha_Actual = new Date();
//     console.log('Fecha Actual: '+Fecha_Actual)
//     console.log('Fecha Expiracion es Mayor a la Fecha Actual..?')
//     console.log(Fecha_Actual < Fecha_Expiracion._d)
// };

export { SessionExpirada };