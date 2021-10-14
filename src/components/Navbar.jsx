import React from 'react'
import ImagenLogo from './ImagenLogo'
import { useAuth0 } from "@auth0/auth0-react"

const Navbar = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <nav className="bg-gray-800">
            <ul className='flex w-full justify-between my-4 px-4'>
                <li className='flex items-center'>
                    <ImagenLogo/>
                </li>
                <li className='px-3 flex items-center'>
                    <button onClick={() => loginWithRedirect()}
                    className='bg-blue-500 p-1 px-3 text-white rounded-full hover:bg-blue-600 font-bold'>
                        Iniciar Sesión
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar