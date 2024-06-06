import React, { useEffect } from 'react'
import Banner from '../layout/Banner'
import CartPage from './CartPage'

function MainCart() {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <>
            <Banner title={'Giỏ hàng'} />
            <CartPage />
        </>
    )
}

export default MainCart