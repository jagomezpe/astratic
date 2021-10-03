import React, { useEffect, useState} from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Usuarios = () => {
    const [mostrarTabla, setMostrarTabla] = useState(false)
    const [usuarios, setUsuarios] = useState([])
    const [textoBoton, setTextoBoton] = useState("Añadir Nuevo Usuario")

    const usuariosBackend = [
        {
            IDUsuario: "123ABC",
            documentoIdentidad: "1088000789",
            nombre: "Amapola",
            apellidos: "Polar",
            numeroCelular: 3218885555,
            correoElectronico: "amapolar@email.com",
            rol: "Vendedor",
            estado: "AUTORIZADO"
        },
        {
            IDUsuario: "456DEF",
            documentoIdentidad: "1077111654",
            nombre: "Patricia Ana",
            apellidos: "Tugillo",
            numeroCelular: 3117772222,
            correoElectronico: "patana@email.com",
            rol: "No Asignado",
            estado: "PENDIENTE"
        },
        {
            IDUsuario: "789GHI",
            documentoIdentidad: "1099555123",
            nombre: "Ébano",
            apellidos: "Banquete",
            numeroCelular: 3187774444,
            correoElectronico: "ebaquete@email.com",
            rol: "Administrador",
            estado: "AUTORIZADO"
        }
    ]

    useEffect(()=> {
        // Obtener listas de usuarios desde el backend
        setUsuarios(usuariosBackend)
    }, [])

    useEffect (()=>{
        if (mostrarTabla) {
            setTextoBoton("Añadir Nuevo Usuario")
        } else {
            setTextoBoton("Lista de Usuarios")
        }
    }, [mostrarTabla])
    
    return (
        <div className='flex flex-col'>
            <h2 className='text-center text-5xl font-bold text-white'>Gestión de Usuarios</h2>
            <button onClick={()=>{setMostrarTabla(!mostrarTabla)}} className='flex items-center justify-center bg-blue-500 p-2 text-white rounded-full hover:bg-blue-600 font-semibold text-base mx-40'>
                {textoBoton}
            </button>
            {mostrarTabla ? <TablaUsuarios listaUsuarios={usuarios}/> : 
            <FormularioCreacionUsuario funcionMostrarTabla = {setMostrarTabla} listaUsuarios = {usuarios} funcionAgregarUsuario= {setUsuarios}/>}
            <ToastContainer
            position="bottom-center"
            autoClose={5000}/>
        </div>
    )
}

const TablaUsuarios = ({listaUsuarios}) => {
    useEffect(()=> {
        console.log(listaUsuarios)
    }, [listaUsuarios])
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='text-gray-700 text-center'>
                    ----------------------------------------------------------------------
            </div>
            <h3 className='text-center text-3xl font-semibold text-white'>Lista de Usuarios</h3>
            <div className='text-gray-700 text-center'>
                    ----------------------------------------------------------------------
            </div>  
            <table className='text-white'>
                <thead>
                    <tr>
                        <th>ID Usuario</th>
                        <th>Documento</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Número Celular</th>
                        <th>Correo Electónico</th>
                        <th>Rol</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {listaUsuarios.map((usuario)=> {
                        return (
                            <tr>
                                <td>{usuario.IDUsuario}</td>
                                <td>{usuario.documentoIdentidad}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellidos}</td>
                                <td>{usuario.numeroCelular}</td>
                                <td>{usuario.correoElectronico}</td>
                                <td>{usuario.rol}</td>
                                <td>{usuario.estado}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

const FormularioCreacionUsuario = ({funcionMostrarTabla, listaUsuarios, funcionAgregarUsuario}) => {
    const [IDUsuario, setIDUsuario] = useState()
    const [documentoIdentidad, setDocumentoIdentidad] = useState()
    const [nombre, setNombre] = useState()
    const [apellidos, setApellidos] = useState()
    const [numeroCelular, setNumeroCelular] = useState()
    const [correoElectronico, setCorreoElectronico] = useState()
    const [rol, setRol] = useState()
    const [estado, setEstado] = useState()

    const enviarAlBackend = () => {
        console.log(IDUsuario, documentoIdentidad, nombre, apellidos, numeroCelular, correoElectronico, rol, estado)
        toast.success('Usuario agregado con éxito', {theme:"colored", transition: Slide})
        funcionMostrarTabla(true)
        funcionAgregarUsuario([...listaUsuarios,{IDUsuario:IDUsuario, documentoIdentidad:documentoIdentidad, nombre:nombre, apellidos:apellidos, numeroCelular:numeroCelular, correoElectronico:correoElectronico, rol:rol, estado:estado}])
    }
    return (
        <div>
            <div className='text-gray-700 text-center'>
                    ----------------------------------------------------------------------
            </div>
            <h3 className='text-center text-3xl font-semibold text-white'>Añadir Nuevo Usuario</h3>
            <div className='text-gray-700 text-center'>
                    ----------------------------------------------------------------------
            </div>
            <form className='grid grid-cols-2'>
                <label htmlFor="IDUsuario">
                    <h6 className='text-gray-200 font-semibold text-xs'>ID del Usuario</h6>
                    <input type="text" required
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white'
                    value={IDUsuario} onChange={(e)=>{setIDUsuario(e.target.value)}}/>
                </label>
                <label htmlFor="documentoIdentidad">
                    <h6 className='text-gray-200 font-semibold text-xs'>Documento de Identidad</h6>
                    <input type="text" required
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white'
                    value={documentoIdentidad} onChange={(e)=>{setDocumentoIdentidad(e.target.value)}}/>
                </label>
                <label htmlFor="nombre">
                    <h6 className='text-gray-200 font-semibold text-xs'>Nombre</h6>
                    <input type="text" required
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white'
                    value={nombre} onChange={(e)=>{setNombre(e.target.value)}}/>
                </label>
                <label htmlFor="apellidos">
                    <h6 className='text-gray-200 font-semibold text-xs'>Apellidos</h6>
                    <input type="text" required
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white'
                    value={apellidos} onChange={(e)=>{setApellidos(e.target.value)}}/>
                </label>
                <label htmlFor="numeroCelular">
                    <h6 className='text-gray-200 font-semibold text-xs'>Número Celular</h6>
                    <input type="tel" required
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white'
                    value={numeroCelular} onChange={(e)=>{setNumeroCelular(e.target.value)}}/>
                </label>
                <label htmlFor="correoElectronico">
                    <h6 className='text-gray-200 font-semibold text-xs'>Correo Electrónico</h6>
                    <input type="email" required
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white'
                    value={correoElectronico} onChange={(e)=>{setCorreoElectronico(e.target.value)}}/>
                </label>
                <label htmlFor="rol">
                    <h6 className='text-gray-200 font-semibold text-xs'>Rol</h6>
                    <select name="rol"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white'
                    value={rol} onChange={(e)=>{setRol(e.target.value)}}>
                        <option disabled>Seleccione el Rol</option>
                        <option>Administrador</option>
                        <option>Vendedor</option>
                        <option>No Asignado</option>
                    </select>
                </label>
                <label htmlFor="estado">
                    <h6 className='text-gray-200 font-semibold text-xs'>Estado</h6>
                    <select name="estado"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white'
                    value={estado} onChange={(e)=>{setEstado(e.target.value)}}>
                        <option disabled>Seleccione el Estado</option>
                        <option>AUTORIZADO</option>
                        <option>NO AUTORIZADO</option>
                        <option>PENDIENTE</option>
                    </select>
                </label>
                <button type="button"
                className='col-span-2 flex items-center justify-center w-full bg-blue-500 p-2 text-white rounded-full hover:bg-blue-600 font-semibold text-base'
                onClick={()=>{enviarAlBackend()}}>
                    Guardar Usuario
                </button>
            </form>
        </div>
    )
}

export default Usuarios