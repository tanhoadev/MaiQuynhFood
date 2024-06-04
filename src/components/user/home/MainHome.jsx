import React from 'react'
import HomeBanner from './HomeBanner'
import Product from './Product'
import Featurs from './Featurs'
import FeatursSession from './FeatursSession'
import Vesitable from './Vesitable'
import BannerSession from './BannerSession'

function MainHome() {
    return (
        <>
            <HomeBanner />
            <Product />
            <Featurs />
            <FeatursSession />
            <Vesitable />
            <BannerSession />
        </>
    )
}

export default MainHome