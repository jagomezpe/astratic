import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='flex flex-col justify-center items-center w-full'>
            <h2 className='m-3 text-center text-3xl font-bold text-gray-900'>Inicio de sesión</h2>
            <form className='mt-4 max-w-sm'>
                <div>
                    ¿Eres un nuevo usuario?
                    <Link to='/registro'>
                    Crea una cuenta
                    </Link>
                </div>
                <div>
                    <h6>Dirección de correo electrónico</h6>
                    <input className='appeareance-none focus:outline-none relative block w-full px-3 py-2 border-b border-gray-300 text-gray-900 font-semibold focus:border-blue-600 focus:z-10 sm:text-sm' type="email" required/>
                    <h6>Contraseña</h6>
                    <input className='appeareance-none focus:outline-none relative block w-full px-3 py-2 border-b border-gray-300 text-gray-900 font-semibold focus:border-blue-600 focus:z-10 sm:text-sm' type="password" required/>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <label htmlFor="recuerdame">
                            <input type="checkbox" />
                            Recuerda mis datos
                        </label>
                    </div>
                    <div>
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