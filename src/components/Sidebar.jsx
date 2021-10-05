import useActiveRoute from 'hooks/useActiveRoute'
import React from 'react'
import { Link } from 'react-router-dom'
import ImagenLogo from './ImagenLogo'

const Sidebar = () => {
    return (
        <nav className="bg-gray-800">
            <ul className='flex w-full justify-between my-4 px-4'>
                <li className='flex items-center'>
                    <Link to='/admin'>
                        <button className='flex items-center'>
                            <ImagenLogo/>
                        </button>
                    </Link>
                </li>
                <li className='flex items-center'>
                    <Ruta ruta='/admin/productos' nombre='Productos'/>
                </li>
                <li className='flex items-center'>
                    <Ruta ruta='/admin/ventas' nombre='Ventas'/>
                </li>
                <li className='flex items-center'>
                    <Ruta ruta='/admin/usuarios' nombre='Usuarios'/>
                </li>
                <li className='flex items-center px-3'>
                    <Link to='/'>
                        <button className='bg-gray-800 border border-white p-1 px-3 text-gray-400 rounded-full hover:bg-gray-400 hover:text-gray-900 font-bold'>
                            Cerrar Sesión
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

const Ruta = ({ruta, nombre}) => {
    const isActive = useActiveRoute(ruta)

    return (
        <Link to={ruta}>
            <button className={`flex text-gray-300 text-lg font-bold items-center bg-${isActive ? 'blue' : 'none'}-500 py-1 px-4 rounded-full hover:bg-blue-500 hover:text-white`}>
                {nombre}
            </button>
        </Link>
    )
}

export default Sidebar