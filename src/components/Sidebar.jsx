import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <nav className="bg-gray-800">
            <ul className='flex w-full justify-between my-3 px-3'>
                <li className='text-gray-500 font-bold'>Logo</li>
                <li className='text-gray-500 font-bold'>Productos</li>
                <li className='text-gray-500 font-bold'>Ventas</li>
                <li className='text-gray-500 font-bold'>Usuarios</li>
                <li className='px-3'>
                    <Link to='/'>
                        <button className='bg-gray-800 border border-white p-1 px-3 text-gray-500 rounded-full hover:bg-gray-500 hover:text-gray-900 font-semibold'>
                            Cerrar Sesión
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar