import axios from "axios"

// CRUD para Usuarios

const getToken = () => {
    return `Bearer ${localStorage.getItem('token')}`
}

export const obtenerUsuarios = async (sucssesCallback, errorCallback) => {
    const options = {
        method: 'GET', url: 'http://localhost:5050/usuarios/',
        headers: {Authorization: getToken()}
    };
    await axios.request(options).then(sucssesCallback).catch(errorCallback)
}

export const crearUsuario = async (data, sucssesCallback, errorCallback) => {
    const options = {
        method: 'POST', url: 'http://localhost:5050/usuarios/',
        headers: {'Content-Type': 'application/json', Authorization: getToken()},
        data
    }
    await axios.request(options).then(sucssesCallback).catch(errorCallback)
}

export const editarUsuario = async (id, data, sucssesCallback, errorCallback) => {
    const options = {
        method: 'PATCH', url: `http://localhost:5050/usuarios/${id}/`,
        headers: {'Content-Type': 'application/json', Authorization: getToken()},
        data
    }
    await axios.request(options).then(sucssesCallback).catch(errorCallback)
}

export const eliminarUsuario = async (id, sucssesCallback, errorCallback) => {
    const options = {
        method: 'DELETE', url: `http://localhost:5050/usuarios/${id}/`,
        headers: {'Content-Type': 'application/json', Authorization: getToken()}
    }
    await axios.request(options).then(sucssesCallback).catch(errorCallback)
}

// CRUD para Productos

export const obtenerProductos = async (sucssesCallback, errorCallback) => {
    const options = {
        method: 'GET', url: 'http://localhost:5050/productos/',
        headers: {Authorization: getToken()}
    }
    await axios.request(options).then(sucssesCallback).catch(errorCallback)
}

// CRUD para Ventas

export const crearVenta = async (data, sucssesCallback, errorCallback) => {
    const options = {
        method: 'POST', url: 'http://localhost:5050/ventas/',
        headers: {'Content-Type': 'application/json', Authorization: getToken()},
        data
    }
    await axios.request(options).then(sucssesCallback).catch(errorCallback)
}