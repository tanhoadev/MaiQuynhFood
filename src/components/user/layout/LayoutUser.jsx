import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import '../../../assets/css/style.css'
import '../../../assets/lib/lightbox/css/lightbox.min.css'
import '../../../assets/lib/owlcarousel/assets/owl.carousel.min.css'
import '../../../assets/css/bootstrap.min.css'
import SearchModal from './SearchModal'
import Footer from './Footer'

function LayoutUser() {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <>
            <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
            <df-messenger
                intent="WELCOME"
                chat-title="Đặt sản Mai Quỳnh"
                agent-id="8488cd70-4835-4cde-96ef-763af2b5511e"
                language-code="vi"
            ></df-messenger>
            <Navigation />
            <SearchModal />
            <Outlet />
            <Footer />
        </>

    )
}

export default LayoutUser