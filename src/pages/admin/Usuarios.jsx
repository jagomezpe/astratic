import React, { useEffect, useState} from 'react'

export const Usuarios = () => {
    const [mostrarTabla, setMostrarTabla] = useState(false)
    const [usuarios, setUsuarios] = useState([])
    const [textoBoton, setTextoBoton] = useState("Añadir Nuevo Usuario")

    const usuariosBackend = [
        {
            editar: <button>Editar</button>,
            eliminar: <button>Eliminar</button>,
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
            editar: <button>Editar</button>,
            eliminar: <button>Eliminar</button>,
            IDUsuario: "456DEF",
            documentoIdentidad: "1077111654",
            nombre: "Patricia Ana",
            apellidos: "Tugillo",
            numeroCelular: 3117772222,
            correoElectronico: "patana@email.com",
            rol: "-",
            estado: "PENDIENTE"
        },
        {
            editar: <button>Editar</button>,
            eliminar: <button>Eliminar</button>,
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
            {mostrarTabla ? <TablaUsuarios listaUsuarios={usuarios}/> : <FormularioCreacionUsuario/>}
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
                        <th>Editar</th>
                        <th>Eliminar</th>
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
                                <td>{usuario.editar}</td>
                                <td>{usuario.eliminar}</td>
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

const FormularioCreacionUsuario = () => {
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
                <div>
                    <h6 className='text-gray-200 font-semibold text-xs'>ID del Usuario</h6>
                    <input type="text" required
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-900 hover:border-white'/>
                </div>
                <div>
                    <h6 className='text-gray-200 font-semibold text-xs'>Documento de Identidad</h6>
                    <input type="text" required
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-900 hover:border-white'/>
                </div>
                <div>
                    <h6 className='text-gray-200 font-semibold text-xs'>Nombre</h6>
                    <input type="text" required
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-900 hover:border-white'/>
                </div>
                <div>
                    <h6 className='text-gray-200 font-semibold text-xs'>Apellidos</h6>
                    <input type="text" required
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-900 hover:border-white'/>
                </div>
                <div>
                    <h6 className='text-gray-200 font-semibold text-xs'>Número Celular</h6>
                    <input type="tel" required
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-900 hover:border-white'/>
                </div>
                <div>
                    <h6 className='text-gray-200 font-semibold text-xs'>Correo Electrónico</h6>
                    <input type="email" required
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-900 hover:border-white'/>
                </div>
                <div>
                    <h6 className='text-gray-200 font-semibold text-xs'>Rol</h6>
                    <input type="text" required
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-900 hover:border-white'/>
                </div>
                <div>
                    <h6 className='text-gray-200 font-semibold text-xs'>Estado</h6>
                    <input type="text" required
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-900 hover:border-white'/>
                </div>
                <button className='col-span-2 flex items-center justify-center w-full bg-blue-500 p-2 text-white rounded-full hover:bg-blue-600 font-semibold text-base'>
                    Guardar Usuario
                </button>
            </form>
        </div>
    )
}

export default Usuarios