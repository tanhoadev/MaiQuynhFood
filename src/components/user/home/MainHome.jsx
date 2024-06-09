import React, { useEffect } from 'react'
import HomeBanner from './HomeBanner'
import Product from './Product'
import Featurs from './Featurs'
import FeatursSession from './FeatursSession'
import Vesitable from './Vesitable'
import BannerSession from './BannerSession'
import BestSale from './BestSale'

function MainHome() {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <>
            <HomeBanner />
            <Product />
            <Featurs />
            <FeatursSession />
            <Vesitable />
            <BannerSession />
            <BestSale />
        </>
    )
}

export default MainHome