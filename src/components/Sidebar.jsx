import useActiveRoute from 'hooks/useActiveRoute'
import React from 'react'
import { Link } from 'react-router-dom'
import ImagenLogo from './ImagenLogo'
import { useAuth0 } from "@auth0/auth0-react"
import PrivateComponent from './PrivateComponent'

const Sidebar = () => {
    const { user, logout } = useAuth0();

    const cerrarSesion = () => {
        logout({ returnTo: 'https://radiant-escarpment-02424.herokuapp.com/admin' })
        localStorage.setItem('token', null)
    }

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
                    <PrivateComponent roleList={['Administrador']}>
                        <Ruta ruta='/admin/productos' nombre='Productos'/>
                    </PrivateComponent>
                </li>
                <li className='flex items-center'>
                    <PrivateComponent roleList={['Administrador', 'Vendedor']}>
                        <Ruta ruta='/admin/ventas' nombre='Ventas'/>
                    </PrivateComponent>
                </li>
                <li className='flex items-center'>
                    <PrivateComponent roleList={['Administrador']}>
                        <Ruta ruta='/admin/usuarios' nombre='Usuarios'/>
                    </PrivateComponent>
                </li>
                <li className='flex items-center px-3'>
                    <button onClick={() => cerrarSesion()}
                    className='flex items-center bg-gray-800 border border-white py-2 px-3 text-gray-400 rounded-full hover:bg-gray-400 hover:text-gray-900 font-bold'>
                        <img src={user.picture} className='h-6 w-6 rounded-full mr-3'/>
                        Cerrar Sesión
                    </button>
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