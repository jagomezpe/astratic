import React from 'react'
import Google from 'media/logo-google.png'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='max-w-md w-full'>
            <h2 className='text-center text-3xl font-bold text-white'>Inicio de sesión</h2>
            <div className='text-gray-700 text-center mb-1 mt-4'>
                ----------------------------------------------------------------------
            </div>
            <form className='max-w-md'>
                <div className='flex justify-between'>
                    <div className='text-gray-400'>
                        ¿Eres un nuevo usuario?
                    </div>
                    <div className='text-blue-500 hover:text-blue-400'>
                        <Link to='/registro'>
                            Crea una cuenta
                        </Link>
                    </div>
                </div>
                <div className='text-gray-700 text-center mb-5 mt-2'>
                    ----------------------------------------------------------------------
                </div>
                <div>
                    <h6 className='text-gray-200 font-semibold text-xs'>Correo electrónico o nombre de usuario</h6>
                    <input className='appeareance-none focus:outline-none relative block w-full py-2 border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-900 hover:border-white' type="email" required/>
                    <h6 className='text-gray-200 font-semibold text-xs mt-5'>Contraseña</h6>
                    <input className='appeareance-none focus:outline-none relative block w-full py-2 border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-900 hover:border-white' type="password" required/>
                </div>
                <div className='flex justify-between mt-5'>
                    <div className='flex items-center'>
                        <input type="checkbox" name="recuerdame" className='h-4 w-4'/>
                        <label htmlFor="recuerdame" className="ml-2 text-sm text-gray-400">
                            Recuerda mis datos
                        </label>
                    </div>
                    <div className='text-blue-500 hover:text-blue-400 text-sm'>
                        <Link to='/'>
                            Olvidé mi contraseña
                        </Link>
                    </div>
                </div>
                <div className='mt-9'>
                    <Link to='/admin'>
                        <button type="submit"
                        className='flex items-center justify-center w-full bg-blue-500 p-2 text-white rounded-full hover:bg-blue-600 font-semibold text-base'>
                            Iniciar Sesión
                        </button>
                    </Link>
                </div>
                <div className='flex items-center justify-between text-gray-400 my-3'>
                    <span className='text-gray-700'>---------------------------------</span>
                    O
                    <span className='text-gray-700'>---------------------------------</span>
                </div>
                <div>
                    <button type="submit"
                    className='flex items-center justify-center w-full bg-gray-200 p-2 text-gray-900 rounded-full hover:bg-gray-300 font-semibold text-base'>
                        <div className='group flex justify-center items-center'>
                            <img src={Google} alt="Logo Google" className='h-4 w-4'/>
                            <span className='mx-4'>Continúa con Google</span>
                        </div>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login