import React from 'react'
import Header from '../Components/Header/header'
import Footer from '../Components/Footer/footer'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

function Layout() {

    const location = useLocation();
    const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register' || location.pathname == '/payment-Success' || location.pathname == '/order-confirm';

    return (
        <>
            <div className="flex flex-col min-h-screen">
                {!isLoginOrRegister && <Header />}
                <main>
                    <Outlet />
                </main>
                {!isLoginOrRegister && <Footer />}
            </div>
        </>
    )
}

export default Layout
