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

        Object.keys(nuevaVenta).forEach((k) => {
            if(k.includes('cantidad')) {
                const indice = parseInt(k.split('_')[1])
                listaProductos[indice]['cantidad'] = nuevaVenta[k]
            }
        })

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
        <div>
            <h3 className='text-center text-2xl font-semibold text-white mt-3 mb-8'>Crear Nueva Venta</h3>
            <form ref={form} onSubmit={submitForm} className='flex flex-col items-center'>
                <label htmlFor="vendedor">
                    <span className='text-gray-200 font-semibold text-xs flex flex-col'>Vendedor</span>
                    <select name="vendedor"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    defaultValue="" required>
                        <option disabled value="">Seleccione un vendedor</option>
                        {vendedores.map((el) => {
                            return <option key={nanoid()} value={el._id}>{`${el.nombre} ${el.apellidos}`}</option>
                        })}
                    </select>
                </label>

                <TablaProductos productos={productos} setProductos={setProductos} setProductosTabla={setProductosTabla}/>
                
                <label htmlFor="venta">
                    <span className='text-gray-200 font-semibold text-xs flex flex-col'>Valor total venta</span>
                    <input type="number" name="valor"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-transparent hover:border-white min-w-full py-1'/>
                </label>
                <div className='flex justify-center'>
                    <button type="submit"
                    className='flex justify-center bg-blue-500 p-2 text-white rounded-full hover:bg-blue-600 font-semibold text-base w-max'>
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

    return (
        <div>
            <div className='flex'>
                <label htmlFor="producto">
                    <select className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    value={productoAAgregar._id ?? ""}
                    onChange={e => setProductoAAgregar(productos.filter((v) => v._id === e.target.value)[0])}>
                        <option disabled value="">Seleccione un producto</option>
                        {productos.map((el) => {
                            return <option key={nanoid()} value={el._id}>{el.nombre}</option>
                        })}
                    </select>
                </label>
                <button type="button" onClick={() => agregarNuevoProducto()}
                className='flex justify-center bg-gray-900 p-2 text-blue-500 rounded-full border border-blue-500 hover:bg-blue-200 hover:text-blue-700 font-semibold text-base w-max'>
                    Agregar Producto
                </button>
            </div>
            <table className='tabla text-center'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Valor</th>
                        <th>Estado</th>
                        <th>Cantidad</th>
                        <th>Eliminar</th>
                        <th className='hidden'>Input</th>
                    </tr>
                </thead>
                <tbody>
                    {filasTabla.map((el, index) => {
                        return(
                            <tr key={nanoid()}>
                                <td>{el._id.slice(19)}</td>
                                <td>{el.nombre}</td>
                                <td>{el.descripcion}</td>
                                <td>{el.valor}</td>
                                <td>{el.estado}</td>
                                <td>
                                    <label htmlFor={`valor_${index}`}>
                                        <input type="number" name={`cantidad_${index}`} required
                                        className='text-black'/>
                                    </label>
                                </td>
                                <td>
                                    <i onClick={() => eliminarProducto(el)} className="fas fa-trash-alt hover:text-red-500 cursor-pointer"/>
                                </td>
                                <input hidden defaultValue={el._id} name={`producto_${index}`} required
                                className='text-black'/>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Ventas