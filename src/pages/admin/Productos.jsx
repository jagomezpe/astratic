import { nanoid } from 'nanoid';
import React, { useEffect, useState, useRef} from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify'
import { Dialog, Tooltip } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.css'
import { obtenerProductos, crearProducto, editarProducto, eliminarProducto } from 'utils/api';
import ReactLoading from 'react-loading';
import PrivateComponent from 'components/PrivateComponent';

const Productos = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true)
    const [productos, setProductos] = useState([])
    const [textoBoton, setTextoBoton] = useState("Añadir Nuevo Producto")
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true)
    const [loading, setLoading ] = useState(false)

    useEffect(() => {
        const fetchProductos = async () => {
            setLoading(true)
            await obtenerProductos (
                (response) => {
                    setProductos(response.data)
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
            fetchProductos()
        }
    }, [ejecutarConsulta])

    useEffect(()=> {
        if(mostrarTabla) {
            setEjecutarConsulta(true)
        }
    }, [mostrarTabla])

    useEffect (()=>{
        if (mostrarTabla) {
            setTextoBoton("Añadir Nuevo Producto")
        } else {
            setTextoBoton("Lista de Productos")
        }
    }, [mostrarTabla])
    
    return (
        <div className='flex flex-col'>
            <h2 className='text-center text-4xl font-bold text-white mt-14'>Administración de Productos</h2>
            <div className='flex justify-center mt-10 mb-7'>
                <PrivateComponent roleList={['Administrador']}>
                <button onClick={()=>{setMostrarTabla(!mostrarTabla)}}
                className='flex justify-center bg-gray-900 p-2 text-blue-500 rounded-full border border-blue-500 hover:bg-blue-200 hover:text-blue-700 font-semibold text-base w-1/6'>
                    {textoBoton}
                </button>
                </PrivateComponent>
            </div>
            {mostrarTabla ? <TablaProductos loading={loading} listaProductos={productos} setEjecutarConsulta={setEjecutarConsulta}/> : 
            <FormularioCreacionProducto setMostrarTabla = {setMostrarTabla} listaProductos = {productos} setProductos= {setProductos}/>}
            <ToastContainer
            position="bottom-center"
            autoClose={5000}/>
        </div>
    )
}

const TablaProductos = ({loading, listaProductos, setEjecutarConsulta}) => {
    const [busqueda, setBusqueda] = useState('')
    const [productosFiltrados, setProductosFlitrados] = useState(listaProductos)

    useEffect(() => {
        setProductosFlitrados (
        listaProductos.filter((elemento) => {
            return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase())
        })
        )    
    }, [busqueda, listaProductos])

    return (
        <div className='flex flex-col items-center justify-center'>
            <h3 className='text-center text-2xl font-semibold text-white mt-3 mb-8'>Lista de Productos</h3>
            <div className='flex justify-between items-center bg-gray-700 px-4 py-2 rounded-full w-1/4 focus:outline-none focus:bg-white mb-9 hover:bg-gray-600'>
                <input value={busqueda} onChange={e=> setBusqueda(e.target.value)}
                placeholder="Buscar"
                className='focus:outline-none bg-transparent text-white w-full'/>
                <i className='fas fa-search text-gray-400'></i>
            </div>
            <div className="container flex justify-center">
                <form className='w-full flex justify-center'>
                    {loading ? <ReactLoading type='spin' color='#ffffff' height={667} width={375}/> :
                    <table className='tabla w-11/12'>
                        <thead>
                            <tr className='text-center'>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Valor Unitario</th>
                                <th>Estado</th>
                                <PrivateComponent roleList={['Administrador']}>
                                    <th>Acciones</th>
                                </PrivateComponent>
                            </tr>
                        </thead>
                        <tbody>
                            {productosFiltrados.map((producto)=> {
                                return (
                                    <FilaProducto key={nanoid()} producto={producto} setEjecutarConsulta={setEjecutarConsulta}/>
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

const FilaProducto = ({ producto, setEjecutarConsulta }) => {
    const [edit, setEdit] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [infoNuevoProducto, setInfoNuevoProducto] = useState({
        _id: producto._id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        valorUnitario: producto.valorUnitario,
        estado: producto.estado,
    })

    const actualizarProducto = async () => {
        await editarProducto(producto._id,
            {
            nombre: infoNuevoProducto.nombre,
            descripcion: infoNuevoProducto.descripcion,
            valorUnitario: infoNuevoProducto.valorUnitario,
            estado: infoNuevoProducto.estado,
            },
            (response) => {
                console.log(response.data);
                toast.success("Producto modificado con éxito", {theme:"colored", transition: Slide})
                setEdit(false)
                setEjecutarConsulta(true)
            },
            (error) => {
                console.error(error);
                toast.error("Error modificando el producto", {theme:"colored", transition: Slide})
            })
    }
    const deletProduct = async () => {
        await eliminarProducto(producto._id,
            (response) => {
                console.log(response.data);
                toast.success("Producto eliminado con éxito", {theme:"colored", transition: Slide})
                setEjecutarConsulta(true)
            },
            (error) => {
                console.error(error);
                toast.error("Error eliminando el producto", {theme:"colored", transition: Slide})
            }
        )
        setOpenDialog(false)
    }

    return (
        <tr className='text-center'>
            {edit ?
                <>
                    <td className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold bg-transparent min-w-full py-1'>
                        {infoNuevoProducto._id.slice(19)}
                    </td>
                    <td><input type="text" value={infoNuevoProducto.nombre} onChange={e=>setInfoNuevoProducto({...infoNuevoProducto, nombre:e.target.value})}
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-transparent hover:border-white min-w-full py-1'/></td>
                    <td><input type="text" value={infoNuevoProducto.descripcion} onChange={e=>setInfoNuevoProducto({...infoNuevoProducto, descripcion:e.target.value})}
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-transparent hover:border-white min-w-full py-1'/></td>
                    <td><input type="number" value={infoNuevoProducto.valorUnitario} onChange={e=>setInfoNuevoProducto({...infoNuevoProducto, valorUnitario:e.target.value})}
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-transparent hover:border-white min-w-full py-1'/></td>
                    <td>
                        <select value={infoNuevoProducto.estado} onChange={e=>setInfoNuevoProducto({...infoNuevoProducto, estado:e.target.value})}
                        className='focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-transparent hover:border-white hover:bg-blue-500 min-w-full py-1'
                        defaultValue={0}>
                            <option>DISPONIBLE</option>
                            <option>NO DISPONIBLE</option>
                        </select>
                    </td>
                </>    
            :
            <>
            <td>{producto._id.slice(19)}</td>
            <td>{producto.nombre}</td>
            <td>{producto.descripcion}</td>
            <td>{producto.valorUnitario}</td>
            <td>{producto.estado}</td>
            </> }
            <PrivateComponent roleList={['Administrador']}>
                <td>
                    <div className='flex w-full justify-around'>
                        {edit ?
                        <>
                            <Tooltip title='Confirmar cambios' arrow placement='top'>
                                <i onClick={()=> actualizarProducto()} className="fas fa-check-circle hover:text-green-400"/>
                            </Tooltip>
                            <Tooltip title='Cancelar cambios' arrow placement='top'>
                                <i onClick={()=> setEdit(!edit)} className="fas fa-ban hover:text-red-500"/>
                            </Tooltip>
                        </>
                        :
                        <>
                            <Tooltip title='Editar Producto' arrow placement='top'>
                                <i onClick={()=> setEdit(!edit)} className="fas fa-edit hover:text-yellow-400"/>
                            </Tooltip>
                            <Tooltip title='Eliminar Producto' arrow placement='top'> 
                                <i onClick={()=> setOpenDialog(true)} className="fas fa-trash-alt hover:text-red-500"/>
                            </Tooltip>  
                        </>               
                        }
                    </div>
                    <Dialog open={openDialog}>
                        <div className='flex flex-col p-8'>
                            <h2 className='text-center text-gray-900 font-semibold text-2xl'>¿Está seguro de eliminar el producto?</h2>
                            <div className='flex justify-around mt-6'>
                                <button onClick={()=> deletProduct()}
                                className='px-4 py-2 bg-blue-500 text-white text-base font-semibold rounded-full w-1/3 hover:bg-blue-600'>Aceptar</button>
                                <button onClick={()=> setOpenDialog(false)}
                                className='px-4 py-2 bg-red-500 text-white text-base font-semibold rounded-full w-1/3 hover:bg-red-600'>Cancelar</button>
                            </div>
                        </div>
                    </Dialog>
                </td>
            </PrivateComponent>
        </tr>
    )
}

const FormularioCreacionProducto = ({setMostrarTabla, listaProductos, setProductos}) => {
    const form = useRef(null)

    const submitForm = async (e) => {
        e.preventDefault()
        const formData = new FormData(form.current)

        const nuevoProducto = {}
        formData.forEach((value, key) => {
            nuevoProducto[key] = value
        })

        await crearProducto({
            nombre: nuevoProducto.nombre,
            descripcion: nuevoProducto.descripcion,
            valorUnitario: nuevoProducto.valorUnitario,
            estado: nuevoProducto.estado
        }, (response) => {
            console.log(response.data)
            toast.success("Producto agregado con éxito", {theme:"colored", transition: Slide})
        },
        (error) => {
            console.error(error)
            toast.error("Error creando el producto", {theme:"colored", transition: Slide})
        })
        setMostrarTabla(true)
    }

    return (
        <div>
            <h3 className='text-center text-2xl font-semibold text-white mt-3 mb-8'>Añadir Nuevo Producto</h3>
            <form ref={form} onSubmit={submitForm} className='grid grid-cols-2 items-center mx-72 mt-8'>
                <label htmlFor="nombre" className="mr-8 mb-4">
                    <h6 className='text-gray-200 font-semibold text-xs'>Nombre</h6>
                    <input type="text" name="nombre"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    required/>
                </label>
                <label htmlFor="descripcion" className="ml-8 mb-4">
                    <h6 className='text-gray-200 font-semibold text-xs'>Descripción</h6>
                    <input type="text" name="descripcion"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    required/>
                </label>
                <label htmlFor="valorUnitario" className="mr-8 mb-4">
                    <h6 className='text-gray-200 font-semibold text-xs'>Valor Unitario</h6>
                    <input type="number" name="valorUnitario"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    required/>
                </label>
                <label htmlFor="estado" className="ml-8 mb-4">
                    <h6 className='text-gray-200 font-semibold text-xs'>Estado</h6>
                    <select name="estado"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    required defaultValue={0}>
                        <option disabled value={0}>Seleccione el Estado</option>
                        <option>DISPONIBLE</option>
                        <option>NO DISPONIBLE</option>
                    </select>
                </label>
                <div className='col-span-2 flex justify-end mt-4 mb-5'>
                    <button type="submit"
                    className='flex justify-center bg-blue-500 p-2 text-white rounded-full hover:bg-blue-600 font-semibold text-base w-1/6'>
                        Guardar Producto
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Productos