import axios from "axios"

// const baseURL = 'http://localhost:5050'
const baseURL = 'https://lit-brook-79598.herokuapp.com'

// CRUD para Usuarios

const getToken = () => {
    return `Bearer ${localStorage.getItem('token')}`
}

export const obtenerUsuarios = async (sucssesCallback, errorCallback) => {
    const options = {
        method: 'GET', url: `${baseURL}/usuarios/`,
        headers: {Authorization: getToken()}
    };
    await axios.request(options).then(sucssesCallback).catch(errorCallback)
}

export const obtenerDatosUsuarios = async (sucssesCallback, errorCallback) => {
    const options = {
        method: 'GET', url: `${baseURL}/usuarios/self`,
        headers: {Authorization: getToken()} // 3. Enviarle el token al backend
    };
    await axios.request(options).then(sucssesCallback).catch(errorCallback)
}

export const crearUsuario = async (data, sucssesCallback, errorCallback) => {
    const options = {
        method: 'POST', url: `${baseURL}/usuarios/`,
        headers: {'Content-Type': 'application/json', Authorization: getToken()},
        data
    }
    await axios.request(options).then(sucssesCallback).catch(errorCallback)
}

export const editarUsuario = async (id, data, sucssesCallback, errorCallback) => {
    const options = {
        method: 'PATCH', url: `${baseURL}/usuarios/${id}/`,
        headers: {'Content-Type': 'application/json', Authorization: getToken()},
        data
    }
    await axios.request(options).then(sucssesCallback).catch(errorCallback)
}

export const eliminarUsuario = async (id, sucssesCallback, errorCallback) => {
    const options = {
        method: 'DELETE', url: `${baseURL}/usuarios/${id}/`,
        headers: {'Content-Type': 'application/json', Authorization: getToken()}
    }
    await axios.request(options).then(sucssesCallback).catch(errorCallback)
}

// CRUD para Productos

export const obtenerProductos = async (sucssesCallback, errorCallback) => {
    const options = {
        method: 'GET', url: `${baseURL}/productos/`,
        headers: {Authorization: getToken()}
    }
    await axios.request(options).then(sucssesCallback).catch(errorCallback)
}

export const crearProducto = async (data, sucssesCallback, errorCallback) => {
    const options = {
        method: 'POST', url: `${baseURL}/productos/`,
        headers: {'Content-Type': 'application/json', Authorization: getToken()},
        data
    }
    await axios.request(options).then(sucssesCallback).catch(errorCallback)
}

export const editarProducto = async (id, data, sucssesCallback, errorCallback) => {
    const options = {
        method: 'PATCH', url: `${baseURL}/productos/${id}/`,
        headers: {'Content-Type': 'application/json', Authorization: getToken()},
        data
    }
    await axios.request(options).then(sucssesCallback).catch(errorCallback)
}

export const eliminarProducto = async (id, sucssesCallback, errorCallback) => {
    const options = {
        method: 'DELETE', url: `${baseURL}/productos/${id}/`,
        headers: {'Content-Type': 'application/json', Authorization: getToken()}
    }
    await axios.request(options).then(sucssesCallback).catch(errorCallback)
}

// CRUD para Ventas

export const crearVenta = async (data, sucssesCallback, errorCallback) => {
    const options = {
        method: 'POST', url: `${baseURL}/ventas/`,
        headers: {'Content-Type': 'application/json', Authorization: getToken()},
        data
    }
    await axios.request(options).then(sucssesCallback).catch(errorCallback)
}