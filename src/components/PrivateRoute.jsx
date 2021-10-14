import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({children}) => {
    const { isAuthenticated, isLoading } = useAuth0();

    if(isLoading) return <div>Loading...</div>

    return isAuthenticated ? <>{children}</> : <div className='text-red-500 text-2xl'>Usuario no autorizado para entrar a este sitio.</div>
}

export default PrivateRoute
