function SessionExpirada(){
    delete localStorage.token;
    localStorage.removeItem('token');
    localStorage.removeItem('NombreUsuario');
    localStorage.removeItem('ApellidoUsuario');
    localStorage.removeItem('EmpresaNombre');
    localStorage.removeItem('DataBaseAlias');
    localStorage.removeItem('Plomero');
    localStorage.removeItem('Empresa');
    window.location.href = '/';
}

function NombreUsuario(){
    return localStorage.getItem('NombreUsuario');
}

function ApellidoUsuario(){
    return localStorage.getItem('ApellidoUsuario');
}

function DataBaseAlias(){
    return localStorage.getItem('DataBaseAlias');
}

function Plomero(){
    return localStorage.getItem('Plomero');
}

function EmpresaNombre(){
    return localStorage.getItem('EmpresaNombre');
}

function HIDANGER(){
    return localStorage.getItem('HIDANGER');
}

function HGDANGER(){
    return localStorage.getItem('HGDANGER');
}

export { SessionExpirada, NombreUsuario, ApellidoUsuario, DataBaseAlias, Plomero, EmpresaNombre, HIDANGER, HGDANGER };