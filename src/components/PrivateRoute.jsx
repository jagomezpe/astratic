import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import ReactLoading from 'react-loading';
import { obtenerDatosUsuarios } from 'utils/api';
import { useUser } from 'context/userContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    const { setUserData } = useUser()

    useEffect(() => {
        const fetchAuth0Token = async () => {
            // 1. Pedir token a auth0
            const accesToken = await getAccessTokenSilently({
                audience: "api-autenticacion-astra-tic"  
            })
            // 2. Recibir token de auth0
            localStorage.setItem('token', accesToken)
            console.log(accesToken)
            // 3. Enviarle el token al backend
            await obtenerDatosUsuarios(
                (response) => {
                    console.log('response', response)
                    setUserData(response.data)
                },
                (error) => {
                    console.log('error', error)
                }
            )
        }
        if(isAuthenticated) {
            fetchAuth0Token()
        }
    }, [isAuthenticated, getAccessTokenSilently])

    if(isLoading) return <div className='flex justify-center bg-gray-900 w-full h-full items-center'> <ReactLoading type='spin' color='#ffffff' height={667} width={375}/> </div>

    if(!isAuthenticated) {
        return loginWithRedirect()
    }

    return <>{children}</>
}
//    return isAuthenticated ? <>{children}</> : <div className='text-red-500 text-2xl'>Usuario no autorizado para entrar a este sitio.</div>

export default PrivateRoute
