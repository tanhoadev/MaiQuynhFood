import React, { useEffect } from 'react'
import BannerSession from '../home/BannerSession'
import Banner from '../layout/Banner'
import FruitsShop from './FruitsShop'

function MainShop() {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <>
            <Banner title="Cửa hàng" />
            <FruitsShop />
        </>
    )
}

export default MainShop