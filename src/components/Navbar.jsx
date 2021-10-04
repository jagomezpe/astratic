import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-gray-800">
            <ul className='flex w-full justify-between my-3 px-3'>
                <li className='text-gray-500 font-bold'>Logo</li>
                <li className='text-gray-500 font-bold'>Opción1</li>
                <li className='text-gray-500 font-bold'>Opción2</li>
                <li className='text-gray-500 font-bold'>Opción3</li>
                <li className='px-3'>
                    <Link to='/login'>
                        <button className='bg-blue-500 p-1 px-3 text-white rounded-full hover:bg-blue-600 font-semibold'>
                            Iniciar Sesión
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar