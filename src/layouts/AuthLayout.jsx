import React from 'react'

const AuthLayout = ({children}) => {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center lg:px-72 bg-gray-900'>
            <div className='max-w-lg w-full'>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout