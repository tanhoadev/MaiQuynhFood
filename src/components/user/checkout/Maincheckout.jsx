import React, { useEffect } from 'react'
import Banner from '../layout/Banner'
import CheckoutPage from './CheckoutPage'

function Maincheckout() {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <>
            <Banner title="Thanh Toán" />
            <CheckoutPage />
        </>
    )
}

export default Maincheckout