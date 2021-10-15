import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import ReactLoading from 'react-loading';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchAuth0Token = async () => {
            const accesToken = await getAccessTokenSilently({
                audience: "api-autenticacion-astra-tic"  
            })
            localStorage.setItem('token', accesToken)
        }
        if(isAuthenticated) {
            fetchAuth0Token()
        }
    }, [isAuthenticated, getAccessTokenSilently])

    if(isLoading) return <div className='flex justify-center bg-gray-900'> <ReactLoading type='spin' color='#ffffff' height={667} width={375}/> </div>

    if(!isAuthenticated) {
        return loginWithRedirect()
    }

    return <>{children}</>
}
//    return isAuthenticated ? <>{children}</> : <div className='text-red-500 text-2xl'>Usuario no autorizado para entrar a este sitio.</div>

export default PrivateRoute
