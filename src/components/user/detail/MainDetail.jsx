import React, { useEffect } from 'react'
import Banner from '../layout/Banner'
import SignleProduct from './SignleProduct'

function MainDetail() {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <>
            <Banner title={'Sản phẩm'} />
            <SignleProduct />
        </>
    )
}

export default MainDetail