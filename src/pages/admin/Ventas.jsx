import { nanoid } from 'nanoid'
import React, { useState, useEffect, useRef } from 'react'
import { obtenerUsuarios, obtenerProductos, crearVenta } from 'utils/api'

const Ventas = () => {
    const form = useRef(null)
    const [vendedores, setVendedores] = useState([])
    const [productos, setProductos] = useState([])
    const [productosTabla, setProductosTabla] = useState([])

    useEffect(() => {
        const fetchVendedores = async () => {
            await obtenerUsuarios(
                (response) => {
                    setVendedores(response.data)
                },
                (error) => {
                    console.error(error)
                }
            )
        }

        const fetchProductos = async () => {
            await obtenerProductos(
                (response) => {
                    setProductos(response.data)
                },
                (error) => {
                    console.error(error)
                }
            )
        }

        fetchVendedores()
        fetchProductos()
    }, [])

    const submitForm = async (e) => {
        e.preventDefault()
        const formData = new FormData(form.current)

        const nuevaVenta = {}
        formData.forEach((value, key) => {
            nuevaVenta[key] = value
        })

        console.log("form data: ", nuevaVenta)

        const listaProductos = Object.keys(nuevaVenta).map((k) => {
            if(k.includes('producto')) {
                return productosTabla.filter((p) => p._id === nuevaVenta[k])[0]
            }
            return null
        }).filter((p) => p)

        const datosVenta = {
            vendedor: vendedores.filter((v) => v._id === nuevaVenta.vendedor)[0],
            cantidad: nuevaVenta.valor,
            productos: listaProductos,
        }

        console.log(listaProductos)

        await crearVenta(datosVenta,
            (response) => {
                console.log(response)
            },
            (error) => {
                console.error(error)
        })
    }

    return (
        <div className='w-full'>
            <div>
                <h2 className='text-center text-4xl font-bold text-white mt-14'>Administración de Ventas</h2>
            </div>
            <h3 className='text-center text-2xl font-semibold text-white mt-8 mb-8'>Crear Nueva Venta</h3>
            <form ref={form} onSubmit={submitForm} className='flex flex-col items-center justify-center w-full'>
                <label htmlFor="vendedor" className='mb-4'>
                    <h6 className='text-gray-200 font-semibold text-xs'>Vendedor</h6>
                    <select name="vendedor"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white py-2 w-96'
                    defaultValue="" required>
                        <option disabled value="">Seleccione un vendedor</option>
                        {vendedores.map((el) => {
                            return <option key={nanoid()} value={el._id}>{`${el.name}`}</option>
                        })}
                    </select>
                </label>

                <TablaProductos productos={productos} setProductos={setProductos} setProductosTabla={setProductosTabla}/>
                
                <div className='flex justify-center'>
                    <button type="submit"
                    className='flex justify-center bg-blue-500 p-2 px-5 text-white rounded-full hover:bg-blue-600 font-semibold text-base'>
                        Crear Venta
                    </button>
                </div>
            </form>
        </div>
    )
}

const TablaProductos =  ({productos, setProductos, setProductosTabla}) => {
    const [productoAAgregar, setProductoAAgregar] = useState({})
    const [filasTabla, setFilasTabla] = useState([])

    useEffect(() => {
        console.log(productoAAgregar)
    }, [productoAAgregar])

    useEffect(() => {
        console.log("filasTabla ", filasTabla)
        setProductosTabla(filasTabla)
    }, [filasTabla, setProductosTabla])

    const agregarNuevoProducto = () => {
        setFilasTabla([...filasTabla, productoAAgregar])
        setProductos(productos.filter((p) => p._id !== productoAAgregar._id))
        setProductoAAgregar({})
    }

    const eliminarProducto = (productoAEliminar) => {
        setFilasTabla(filasTabla.filter((p) => p._id !== productoAEliminar._id))
        setProductos([...productos, productoAEliminar])
    }

    const modificarProducto = (producto, cantidad) => {
        setFilasTabla(filasTabla.map((ft) => {
            if(ft._id === producto._id) {
                ft.cantidad = cantidad
                ft.total = producto.valorUnitario * cantidad
            }
            return ft
        })
        )
    }

    return (
        <div>
            <div className='flex justify-center'>
                <label htmlFor="producto" className='mb-4 mr-5'>
                    <h6 className='text-gray-200 font-semibold text-xs'>Producto</h6>
                    <select className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white py-2 w-52'
                    value={productoAAgregar._id ?? ""}
                    onChange={e => setProductoAAgregar(productos.filter((v) => v._id === e.target.value)[0])}>
                        <option disabled value="">Seleccione un producto</option>
                        {productos.map((el) => {
                            return <option key={nanoid()} value={el._id}>{el.nombre}</option>
                        })}
                    </select>
                </label>
                <div className='flex items-center'>
                    <button type="button" onClick={() => agregarNuevoProducto()}
                    className='flex justify-center items-center bg-gray-900 p-2 text-blue-500 rounded-full border border-blue-500 hover:bg-blue-200 hover:text-blue-700 font-semibold text-center px-3'>
                        Agregar Producto
                    </button>
                </div>
            </div>
            <table className='tabla max-w-screen-lg mt-4 mb-8'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Cantidad</th>
                        <th>Valor Unitario</th>
                        <th>Total</th>
                        <th>Eliminar</th>
                        <th className='hidden'>Input</th>
                    </tr>
                </thead>
                <tbody>
                    {filasTabla.map((el, index) => {
                        return (
                            <FilaProducto
                                key={el._id}
                                product={el}
                                index={index}
                                eliminarProducto={eliminarProducto}
                                modificarProducto={modificarProducto}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

const FilaProducto = ({ product, index, eliminarProducto, modificarProducto }) => {
    const [producto, setProducto] = useState(product)
    useEffect (() => {
        console.log('product', producto)
    }, [producto])
    return (
        <tr>
            <td>{producto._id.slice(19)}</td>
            <td>{producto.nombre}</td>
            <td>{producto.descripcion}</td>
            <td>{producto.estado}</td>
            <td>
                <label htmlFor={`valor_${index}`}>
                    <input type="number" name={`cantidad_${index}`} required value={producto.cantidad}
                    onChange={(e) => {
                        modificarProducto(producto, e.target.value === '' ? '0' : e.target.value)
                        setProducto({
                            ...producto,
                            cantidad: e.target.value === '' ? '0' : e.target.value,
                            total: parseFloat(producto.valorUnitario) * parseFloat(e.target.value === '' ? '0' : e.target.value)
                        })
                    }}
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-transparent hover:border-white min-w-full py-1'/>
                </label>
            </td>
            <td>{producto.valorUnitario}</td>
            <td>{parseFloat(producto.total ?? 0)}</td>
            <td>
                <i onClick={() => eliminarProducto(producto)} className="fas fa-trash-alt hover:text-red-500 cursor-pointer flex justify-center"/>
            </td>
            <td className='hidden'>
                <input hidden defaultValue={producto._id} name={`producto_${index}`} required
                className='text-black'/>   
            </td>
        </tr>
    )
}

export default Ventas