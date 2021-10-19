import { useUser } from 'context/userContext'
import React from 'react'

const PrivateRoute = ({ roleList, children }) => {
    const { userData } = useUser()

    if(roleList.includes(userData.rol)) {
        return children
    }

    return <div className='flex flex-col justify-center items-center h-full w-full'>
        <i className="fas fa-exclamation-triangle text-yellow-400 text-9xl mb-16"></i>
        <span className='text-red-500 text-5xl font-bold'>
            ¡No está autorizado para ver este sitio!
        </span>
        
    </div>
}

export default PrivateRoute
