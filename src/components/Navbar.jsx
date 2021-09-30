import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-red-400">
            <ul className='flex w-full justify-between my-3 px-3'>
                <li>Logo</li>
                <li>Opción1</li>
                <li>Opción2</li>
                <li>Opción3</li>
                <li className='px-3'>
                    <Link to='/login'>
                        <button className='bg-blue-600 p-1 px-3 text-white rounded-full hover:bg-blue-800'>
                            Iniciar Sesión
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar