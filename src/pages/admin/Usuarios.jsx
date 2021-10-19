import { nanoid } from 'nanoid';
import React, { useEffect, useState, useRef} from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify'
import { Dialog, Tooltip } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.css'
import { obtenerUsuarios, crearUsuario, editarUsuario, eliminarUsuario } from 'utils/api';
import ReactLoading from 'react-loading';
import PrivateComponent from 'components/PrivateComponent';

const Usuarios = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true)
    const [usuarios, setUsuarios] = useState([])
    const [textoBoton, setTextoBoton] = useState("Añadir Nuevo Usuario")
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true)
    const [loading, setLoading ] = useState(false)

    useEffect(() => {
        const fetchUsuarios = async () => {
            setLoading(true)
            await obtenerUsuarios (
                (response) => {
                    setUsuarios(response.data)
                    setEjecutarConsulta(false)
                    setLoading(false)
                },
                (error) => {
                    console.log(error)
                    setLoading(false)
                }
            )
        }
        if(ejecutarConsulta) {
            fetchUsuarios()
        }
    }, [ejecutarConsulta])

    useEffect(()=> {
        if(mostrarTabla) {
            setEjecutarConsulta(true)
        }
    }, [mostrarTabla])

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
                <PrivateComponent roleList={["Administrador"]}>
                <button onClick={()=>{setMostrarTabla(!mostrarTabla)}}
                className='flex justify-center bg-gray-900 p-2 text-blue-500 rounded-full border border-blue-500 hover:bg-blue-200 hover:text-blue-700 font-semibold text-base w-1/6'>
                    {textoBoton}
                </button>
                </PrivateComponent>
            </div>
            {mostrarTabla ? <TablaUsuarios loading={loading} listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta}/> : 
            <FormularioCreacionUsuario setMostrarTabla = {setMostrarTabla} listaUsuarios = {usuarios} setUsuarios= {setUsuarios}/>}
            <ToastContainer
            position="bottom-center"
            autoClose={5000}/>
        </div>
    )
}

const TablaUsuarios = ({loading, listaUsuarios, setEjecutarConsulta}) => {
    const [busqueda, setBusqueda] = useState('')
    const [usuariosFiltrados, setUsuariosFlitrados] = useState(listaUsuarios)

    useEffect(() => {
        setUsuariosFlitrados (
        listaUsuarios.filter((elemento) => {
            return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase())
        })
        )    
    }, [busqueda, listaUsuarios])

    return (
        <div className='flex flex-col items-center justify-center'>
            <h3 className='text-center text-2xl font-semibold text-white mt-3 mb-8'>Lista de Usuarios</h3>
            <div className='flex justify-between items-center bg-gray-700 px-4 py-2 rounded-full w-1/4 focus:outline-none focus:bg-white mb-9 hover:bg-gray-600'>
                <input value={busqueda} onChange={e=> setBusqueda(e.target.value)}
                placeholder="Buscar"
                className='focus:outline-none bg-transparent text-white w-full'/>
                <i className='fas fa-search text-gray-400'></i>
            </div>
            <div className="container flex justify-center">
                <form className='w-full flex justify-center'>
                    {loading ? <ReactLoading type='spin' color='#ffffff' height={200} width={200}/> :
                    <table className='tabla w-11/12'>
                        <thead>
                            <tr className='text-center'>
                                <th>ID</th>
                                <th>Documento</th>
                                <th>Nombre</th>
                                <th>Número Celular</th>
                                <th>Correo Electónico</th>
                                <th>Estado</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosFiltrados.map((usuario)=> {
                                return (
                                    <FilaUsuario key={nanoid()} usuario={usuario} setEjecutarConsulta={setEjecutarConsulta}/>
                                )
                            })}
                        </tbody>
                    </table>
                    }
                </form>
            </div>  
        </div>
    )
}

const FilaUsuario = ({ usuario, setEjecutarConsulta }) => {
    const [edit, setEdit] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [infoNuevoUsuario, setInfoNuevoUsuario] = useState({
        _id: usuario._id,
        documentoIdentidad: usuario.documentoIdentidad,
        name: usuario.name,
        numeroCelular: usuario.numeroCelular,
        email: usuario.email,
        estado: usuario.estado,
        rol: usuario.rol,
    })

    const actualizarUsuario = async () => {
        await editarUsuario(usuario._id,
            {   
            documentoIdentidad: infoNuevoUsuario.documentoIdentidad,
            nombre: infoNuevoUsuario.nombre,
            numeroCelular: infoNuevoUsuario.numeroCelular,
            email: infoNuevoUsuario.email,
            estado: infoNuevoUsuario.estado,
            rol: infoNuevoUsuario.rol,
            },
            (response) => {
                console.log(response.data);
                toast.success("Usuario modificado con éxito", {theme:"colored", transition: Slide})
                setEdit(false)
                setEjecutarConsulta(true)
            },
            (error) => {
                console.error(error);
                toast.error("Error modificando el usuario", {theme:"colored", transition: Slide})
            })
    }
    const deleteUser = async () => {
        await eliminarUsuario(usuario._id,
            (response) => {
                console.log(response.data);
                toast.success("Usuario eliminado con éxito", {theme:"colored", transition: Slide})
                setEjecutarConsulta(true)
            },
            (error) => {
                console.error(error);
                toast.error("Error eliminando el usuario", {theme:"colored", transition: Slide})
            }
        )
        setOpenDialog(false)
    }

    return (
        <tr className='text-center'>
            {edit ?
                <>
                    <td className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold bg-transparent min-w-full py-1'>
                        {infoNuevoUsuario._id.slice(19)}
                    </td>
                    <td><input type="text" value={infoNuevoUsuario.documentoIdentidad} onChange={e=>setInfoNuevoUsuario({...infoNuevoUsuario, documentoIdentidad:e.target.value})}
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-transparent hover:border-white min-w-full py-1'/></td>
                    <td><input type="text" value={infoNuevoUsuario.name} onChange={e=>setInfoNuevoUsuario({...infoNuevoUsuario, name:e.target.value})}
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-transparent hover:border-white min-w-full py-1'/></td>
                    <td><input type="tel" value={infoNuevoUsuario.numeroCelular} onChange={e=>setInfoNuevoUsuario({...infoNuevoUsuario, numeroCelular:e.target.value})}
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-transparent hover:border-white min-w-full py-1'/></td>
                    <td><input type="email" value={infoNuevoUsuario.email} onChange={e=>setInfoNuevoUsuario({...infoNuevoUsuario, email:e.target.value})}
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-transparent hover:border-white min-w-full py-1'/></td>
                    <td>
                        <select value={infoNuevoUsuario.estado} onChange={e=>setInfoNuevoUsuario({...infoNuevoUsuario, estado:e.target.value})}
                        className='focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-transparent hover:border-white hover:bg-blue-500 min-w-full py-1'
                        defaultValue={0}>
                            <option>AUTORIZADO</option>
                            <option>PENDIENTE</option>
                            <option>NO AUTORIZADO</option>
                        </select>
                    </td>
                    <td>
                        <select value={infoNuevoUsuario.rol} onChange={e=>setInfoNuevoUsuario({...infoNuevoUsuario, rol:e.target.value})}
                        className='focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-transparent hover:border-white hover:bg-blue-500 min-w-full py-1'
                        defaultValue={0}>
                            <option>Administrador</option>
                            <option>Vendedor</option>
                            <option>No Asignado</option>
                        </select>
                    </td>
                </>    
            :
            <>
            <td>{usuario._id.slice(19)}</td>
            <td>{usuario.documentoIdentidad}</td>
            <td>{usuario.name}</td>
            <td>{usuario.numeroCelular}</td>
            <td>{usuario.email}</td>
            <td>{usuario.estado}</td>
            <td>{usuario.rol}</td>
            </> }
                <td>
                    <div className='flex w-full justify-around'>
                        {edit ?
                        <>
                        <Tooltip title='Confirmar cambios' arrow placement='top'>
                            <i onClick={()=> actualizarUsuario()} className="fas fa-check-circle hover:text-green-400"/>
                        </Tooltip>
                        <Tooltip title='Cancelar cambios' arrow placement='top'>
                            <i onClick={()=> setEdit(!edit)} className="fas fa-ban hover:text-red-500"/>
                        </Tooltip>
                    </>
                    :
                    <>
                        <Tooltip title='Editar Usuario' arrow placement='top'>
                            <i onClick={()=> setEdit(!edit)} className="fas fa-edit hover:text-yellow-400"/>
                        </Tooltip>
                        <Tooltip title='Eliminar Usuario' arrow placement='top'> 
                            <i onClick={()=> setOpenDialog(true)} className="fas fa-trash-alt hover:text-red-500"/>
                        </Tooltip>  
                    </>               
                    }
                    </div>
                    <Dialog open={openDialog}>
                        <div className='flex flex-col p-8'>
                            <h2 className='text-center text-gray-900 font-semibold text-2xl'>¿Está seguro de eliminar el usuario?</h2>
                            <div className='flex justify-around mt-6'>
                                <button onClick={()=> deleteUser()}
                                className='px-4 py-2 bg-blue-500 text-white text-base font-semibold rounded-full w-1/3 hover:bg-blue-600'>Aceptar</button>
                                <button onClick={()=> setOpenDialog(false)}
                                className='px-4 py-2 bg-red-500 text-white text-base font-semibold rounded-full w-1/3 hover:bg-red-600'>Cancelar</button>
                            </div>
                        </div>
                    </Dialog>
            </td>
        </tr>
    )
}

const FormularioCreacionUsuario = ({setMostrarTabla, listaUsuarios, setUsuarios}) => {
    const form = useRef(null)

    const submitForm = async (e) => {
        e.preventDefault()
        const formData = new FormData(form.current)

        const nuevoUsuario = {}
        formData.forEach((value, key) => {
            nuevoUsuario[key] = value
        })

        await crearUsuario({
            documentoIdentidad: nuevoUsuario.documentoIdentidad,
            name: nuevoUsuario.name,
            numeroCelular: nuevoUsuario.numeroCelular,
            email: nuevoUsuario.email,
            estado: nuevoUsuario.estado,
            rol: nuevoUsuario.rol
        }, (response) => {
            console.log(response.data)
            toast.success("Usuario agregado con éxito", {theme:"colored", transition: Slide})
        },
        (error) => {
            console.error(error)
            toast.error("Error creando el usuario", {theme:"colored", transition: Slide})
        })
        setMostrarTabla(true)
    }

    return (
        <div>
            <h3 className='text-center text-2xl font-semibold text-white mt-3 mb-8'>Añadir Nuevo Usuario</h3>
            <form ref={form} onSubmit={submitForm} className='grid grid-cols-2 items-center mx-72 mt-8'>
                <label htmlFor="documentoIdentidad" className="mr-8 mb-4">
                    <h6 className='text-gray-200 font-semibold text-xs'>Documento de Identidad</h6>
                    <input type="text" name="documentoIdentidad"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    required/>
                </label>
                <label htmlFor="name" className="ml-8 mb-4">
                    <h6 className='text-gray-200 font-semibold text-xs'>Nombre Completo</h6>
                    <input type="text" name="name"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    required/>
                </label>
                <label htmlFor="numeroCelular" className="mr-8 mb-4">
                    <h6 className='text-gray-200 font-semibold text-xs'>Número Celular</h6>
                    <input type="text" name="numeroCelular"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    required/>
                </label>
                <label htmlFor="email" className="ml-8 mb-4">
                    <h6 className='text-gray-200 font-semibold text-xs'>Correo Electrónico</h6>
                    <input type="tel" name="email"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    required/>
                </label>
                <label htmlFor="estado" className="mr-8 mb-4">
                    <h6 className='text-gray-200 font-semibold text-xs'>Estado</h6>
                    <select name="estado"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    required defaultValue={0}>
                        <option disabled value={0}>Seleccione el Estado</option>
                        <option>AUTORIZADO</option>
                        <option>PENDIENTE</option>
                        <option>NO AUTORIZADO</option>
                    </select>
                </label>
                <label htmlFor="rol" className="ml-8 mb-4">
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