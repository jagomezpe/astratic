import Footer from 'components/Footer'
import Sidebar from 'components/Sidebar'
import React from 'react'

const PrivateLayout = ({children}) => {
    return (
        <div className="flex flex-col justify-between h-screen">
            <Sidebar/>
            <div className='min-h-screen flex flex-col items-center justify-center lg:px-10 bg-gray-900'>
                <main className='max-w-lg w-full'>
                    {children}
                </main>
            </div>
            <Footer/>
        </div>
    )
}

export default PrivateLayout