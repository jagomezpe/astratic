import React from 'react'
import { Link } from 'react-router-dom'
import ImagenLogo from './ImagenLogo'

const Navbar = () => {
    return (
        <nav className="bg-gray-800">
            <ul className='flex w-full justify-between my-4 px-4'>
                <li className='flex items-center'>
                    <ImagenLogo/>
                </li>
                <li className='px-3 flex items-center'>
                    <Link to='/login'>
                        <button className='bg-blue-500 p-1 px-3 text-white rounded-full hover:bg-blue-600 font-bold'>
                            Iniciar Sesión
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar