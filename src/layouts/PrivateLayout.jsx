import Footer from 'components/Footer'
import Sidebar from 'components/Sidebar'
import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import ReactLoading from 'react-loading';
import { obtenerDatosUsuarios } from 'utils/api';
import { useUser } from 'context/userContext';

const PrivateLayout = ({children}) => {
    const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently, logout } = useAuth0();
    const [loadingUserInformation, setLoadingUserInformation] = useState(false)
    const { setUserData } = useUser()

    useEffect(() => {
        const fetchAuth0Token = async () => {
            setLoadingUserInformation(true)
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
                    setLoadingUserInformation(false)
                },
                (error) => {
                    console.log('error', error)
                    setLoadingUserInformation(false)
                    logout({ returnTo: 'http://localhost:3000/admin' })
                }
            )
        }
        if(isAuthenticated) {
            fetchAuth0Token()
        }
    }, [isAuthenticated, getAccessTokenSilently])

    if(isLoading || loadingUserInformation) return <div className='flex flex-col justify-center items-center h-screen w-screen bg-gray-900'>
        <ReactLoading type='spin' color='#ffffff' height={350} width={350}/>
    </div> 

    if(!isAuthenticated) {
        return loginWithRedirect()
    }

    return (
        <div className="flex flex-col justify-between h-screen">
            <Sidebar/>
            <div className='h-full overflow-y-scroll bg-gray-900'>
                <main className='h-full'>
                    {children}
                </main>
                <Footer/>
            </div>
        </div>
    )
}

export default PrivateLayout