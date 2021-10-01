import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <nav className="bg-red-400">
            <ul className='flex w-full justify-between my-3 px-3'>
                <li>Logo</li>
                <li>Productos</li>
                <li>Ventas</li>
                <li>Usuarios</li>
                <li className='px-3'>
                    <Link to='/'>
                        <button className='bg-blue-500 p-1 px-3 text-white rounded-full hover:bg-blue-600 font-semibold'>
                            Cerrar Sesión
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar