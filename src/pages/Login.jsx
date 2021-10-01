import React from 'react'
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
                    <h6 className='text-gray-200 font-semibold text-xs'>Dirección de correo electrónico</h6>
                    <input className='appeareance-none focus:outline-none relative block w-full px-3 py-2 border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-900 hover:border-white' type="email" required/>
                    <h6 className='text-gray-200 font-semibold text-xs mt-5'>Contraseña</h6>
                    <input className='appeareance-none focus:outline-none relative block w-full px-3 py-2 border-b-2 border-gray-400 text-white font-semibold focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-900 hover:border-white' type="password" required/>
                </div>
                <div className='flex justify-between mt-5'>
                    <div className='flex items-center'>
                        <input type="checkbox" name="recuerdame" className='h-4 w-4'/>
                        <label htmlFor="recuerdame" className="ml-2 block text-sm text-gray-400">
                            Recuerda mis datos
                        </label>
                    </div>
                    <div className='text-blue-500 hover:text-blue-400 text-sm'>
                        <Link to='/'>
                            Olvidé mi contraseña
                        </Link>
                    </div>
                </div>
                <div>
                    <Link to='/admin'>
                        <button type="submit">
                            Iniciar Sesión
                        </button>
                    </Link>
                </div>
                <div>
                    O
                </div>
                <div>
                    <button>
                        Continua con Google
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login