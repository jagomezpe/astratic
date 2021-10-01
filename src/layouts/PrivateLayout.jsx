import Footer from 'components/Footer'
import Sidebar from 'components/Sidebar'
import React from 'react'

const PrivateLayout = ({children}) => {
    return (
        <div className="flex flex-col justify-between h-screen">
            <Sidebar/>
            <div className="h-full overflow-y-scroll bg-blue-400">
                <main className="h-full">
                    {children}
                </main>
                <Footer/>
            </div>
        </div>
    )
}

export default PrivateLayout