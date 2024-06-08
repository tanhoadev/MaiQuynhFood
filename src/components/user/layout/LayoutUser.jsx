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
    return (
        <>
            {/* Spinner Start */}
            {/* <div
                id="spinner"
                className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center"
            >
                <div className="spinner-grow text-primary" role="status" />
            </div> */}
            {/* Spinner End */}
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