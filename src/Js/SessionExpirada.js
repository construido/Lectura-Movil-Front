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

export { SessionExpirada };