import React, { useEffect, useState, useRef} from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Usuarios = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true)
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
    },[])

    useEffect (()=>{
        if (mostrarTabla) {
            setTextoBoton("Añadir Nuevo Usuario")
        } else {
            setTextoBoton("Lista de Usuarios")
        }
    }, [mostrarTabla])
    
    return (
        <div className='flex flex-col'>
            <h2 className='text-center text-4xl font-bold text-white mt-14'>Administración de Usuarios</h2>
            <div className='flex justify-center mt-10 mb-7'>
                <button onClick={()=>{setMostrarTabla(!mostrarTabla)}}
                className='flex justify-center bg-gray-900 p-2 text-blue-500 rounded-full border border-blue-500 hover:bg-blue-200 hover:text-blue-700 font-semibold text-base w-1/6'>
                    {textoBoton}
                </button>
            </div>
            {mostrarTabla ? <TablaUsuarios listaUsuarios={usuarios}/> : 
            <FormularioCreacionUsuario setMostrarTabla = {setMostrarTabla} listaUsuarios = {usuarios} setUsuarios= {setUsuarios}/>}
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
            <h3 className='text-center text-2xl font-semibold text-white mt-3 mb-8'>Lista de Usuarios</h3>
            <div className="container flex justify-center">
                <table className='w-11/12'>
                    <thead>
                        <tr className='text-center'>
                            <th className='border-t border-b border-blue-500 px-4 py-2 text-blue-500'>ID Usuario</th>
                            <th className='border-t border-b border-blue-500 px-4 py-2 text-blue-500'>Documento</th>
                            <th className='border-t border-b border-blue-500 px-4 py-2 text-blue-500'>Nombre</th>
                            <th className='border-t border-b border-blue-500 px-4 py-2 text-blue-500'>Apellidos</th>
                            <th className='border-t border-b border-blue-500 px-4 py-2 text-blue-500'>Número Celular</th>
                            <th className='border-t border-b border-blue-500 px-4 py-2 text-blue-500'>Correo Electónico</th>
                            <th className='border-t border-b border-blue-500 px-4 py-2 text-blue-500'>Rol</th>
                            <th className='border-t border-b border-blue-500 px-4 py-2 text-blue-500'>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaUsuarios.map((usuario)=> {
                            return (
                                <tr className='text-center'>
                                    <td className='border-b-2 border-gray-700 px-4 py-2 text-white'>{usuario.IDUsuario}</td>
                                    <td className='border-b-2 border-gray-700 px-4 py-2 text-white'>{usuario.documentoIdentidad}</td>
                                    <td className='border-b-2 border-gray-700 px-4 py-2 text-white'>{usuario.nombre}</td>
                                    <td className='border-b-2 border-gray-700 px-4 py-2 text-white'>{usuario.apellidos}</td>
                                    <td className='border-b-2 border-gray-700 px-4 py-2 text-white'>{usuario.numeroCelular}</td>
                                    <td className='border-b-2 border-gray-700 px-4 py-2 text-white'>{usuario.correoElectronico}</td>
                                    <td className='border-b-2 border-gray-700 px-4 py-2 text-white'>{usuario.rol}</td>
                                    <td className='border-b-2 border-gray-700 px-4 py-2 text-white'>{usuario.estado}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>  
        </div>
    )
}

const FormularioCreacionUsuario = ({setMostrarTabla, listaUsuarios, setUsuarios}) => {
    const form = useRef(null)

    const submitForm = (e) => {
        e.preventDefault()
        const formData = new FormData(form.current)

        const nuevoUsuario = {}
        formData.forEach((value, key) => {
            nuevoUsuario[key] = value
        })

        setMostrarTabla(true)
        toast.success("Usuario agregado con éxito", {theme:"colored", transition: Slide})
        setUsuarios([...listaUsuarios, nuevoUsuario])
    }

    return (
        <div>
            <div className='text-gray-700 text-center'>
                ----------------------------------------------------------------------------------------------------------------------------------------------------
            </div>
            <h3 className='text-center text-2xl font-semibold text-white'>Añadir Nuevo Usuario</h3>
            <div className='text-gray-700 text-center'>
                ----------------------------------------------------------------------------------------------------------------------------------------------------
            </div>
            <form ref={form} onSubmit={submitForm} className='grid grid-cols-2 items-center mx-72 mt-6'>
                <label htmlFor="IDUsuario" className="mr-8 mb-4">
                    <h6 className='text-gray-200 font-semibold text-xs'>ID del Usuario</h6>
                    <input type="text" name="IDUsuario"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    required/>
                </label>
                <label htmlFor="documentoIdentidad" className="ml-8 mb-4">
                    <h6 className='text-gray-200 font-semibold text-xs'>Documento de Identidad</h6>
                    <input type="text" name="documentoIdentidad"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    required/>
                </label>
                <label htmlFor="nombre" className="mr-8 mb-4">
                    <h6 className='text-gray-200 font-semibold text-xs'>Nombre</h6>
                    <input type="text" name="nombre"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    required/>
                </label>
                <label htmlFor="apellidos" className="ml-8 mb-4">
                    <h6 className='text-gray-200 font-semibold text-xs'>Apellidos</h6>
                    <input type="text" name="apellidos"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    required/>
                </label>
                <label htmlFor="numeroCelular" className="mr-8 mb-4">
                    <h6 className='text-gray-200 font-semibold text-xs'>Número Celular</h6>
                    <input type="tel" name="numeroCelular"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    required/>
                </label>
                <label htmlFor="correoElectronico" className="ml-8 mb-4">
                    <h6 className='text-gray-200 font-semibold text-xs'>Correo Electrónico</h6>
                    <input type="email" name="correoElectronico"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    required/>
                </label>
                <label htmlFor="rol" className="mr-8 mb-4">
                    <h6 className='text-gray-200 font-semibold text-xs'>Rol</h6>
                    <select name="rol"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    required defaultValue={0}>
                        <option disabled value={0}>Seleccione el Rol</option>
                        <option>Administrador</option>
                        <option>Vendedor</option>
                        <option>No Asignado</option>
                    </select>
                </label>
                <label htmlFor="estado" className="ml-8 mb-4">
                    <h6 className='text-gray-200 font-semibold text-xs'>Estado</h6>
                    <select name="estado"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    required defaultValue={0}>
                        <option disabled value={0}>Seleccione el Estado</option>
                        <option>AUTORIZADO</option>
                        <option>NO AUTORIZADO</option>
                        <option>PENDIENTE</option>
                    </select>
                </label>
                <div className='col-span-2 flex justify-end mt-4 mb-5'>
                    <button type="submit"
                    className='flex justify-center bg-blue-500 p-2 text-white rounded-full hover:bg-blue-600 font-semibold text-base w-1/6'>
                        Guardar Usuario
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Usuarios