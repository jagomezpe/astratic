import { nanoid } from 'nanoid'
import React, { useState, useEffect, useRef } from 'react'
import { obtenerUsuarios, obtenerProductos, crearVenta } from 'utils/api'

const Ventas = () => {
    const form = useRef(null)
    const [vendedores, setVendedores] = useState([])
    const [productos, setProductos] = useState([])
    const [productosSeleccionados, setProductosSeleccionados] = useState([])

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

    useEffect(() => {
        console.log("Productos seleccionados: ", productosSeleccionados)
    }, [productosSeleccionados])

    const agregarNuevoProducto = () => {
        setProductosSeleccionados([...productosSeleccionados, DropDownProductos])
    }

    const submitForm = async (e) => {
        e.preventDefault()
        const formData = new FormData(form.current)

        const nuevaVenta = {}
        formData.forEach((value, key) => {
            nuevaVenta[key] = value
        })

        console.log("form data: ", nuevaVenta)

        /* const infoConsolidada = {
            valor: nuevaVenta.valor,
            vendedor: vendedores.filter(v => v._id === nuevaVenta.vendedor)[0],
            producto: productos.filter(p => p._id === nuevaVenta.producto)[0]
        }

        await crearVenta(infoConsolidada,
            (response) => {
                console.log(response)
            },
            (error) => {
                console.error(error)
            }) */
    }

    return (
        <div>
            <h3 className='text-center text-2xl font-semibold text-white mt-3 mb-8'>Crear Nueva Venta</h3>
            <form ref={form} onSubmit={submitForm} className='flex flex-col items-center'>
                <label htmlFor="vendedor">
                    <span className='text-gray-200 font-semibold text-xs flex flex-col'>Vendedor</span>
                    <select name="vendedor"
                    className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
                    defaultValue={0}>
                        <option disabled value={0}>Seleccione un vendedor</option>
                        {vendedores.map((el) => {
                            return <option key={nanoid()} value={el._id}>{`${el.nombre} ${el.apellidos}`}</option>
                        })}
                    </select>
                </label>
                <div className='col-span-2'>
                    <span className='text-gray-200 font-semibold text-xs flex flex-col'>Selección de productos</span>
                    <button onClick={() => agregarNuevoProducto()}
                    className='flex justify-center bg-gray-900 p-2 text-blue-500 rounded-full border border-blue-500 hover:bg-blue-200 hover:text-blue-700 font-semibold text-base w-max'>
                        Agregar nuevo producto
                    </button>
                </div>
                
                {productosSeleccionados.map((DropDownProductos, index) => {
                    return (
                        <div className='flex'>
                            <DropDownProductos key={nanoid()} productos={productos} nombre={`producto_${index}`}/>
                            <button className='text-blue-500'>
                                Eliminar
                            </button>
                        </div>
                    )
                })
                }

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

const DropDownProductos = ({ productos, nombre }) => {
    return (
        <label htmlFor="producto">
            <span className='text-gray-200 font-semibold text-xs flex flex-col'>Producto</span>
            <select name={nombre}
            className='appeareance-none focus:outline-none border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 bg-gray-900 hover:border-white min-w-full py-2'
            defaultValue={0}>
                <option disabled value={0}>Seleccione un producto</option>
                {productos.map((el) => {
                    return <option key={nanoid()} value={el._id}>{el.nombre}</option>
                })}
            </select>
        </label>
    )
}

export default Ventas