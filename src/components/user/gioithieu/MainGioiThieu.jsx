import React, { useEffect } from 'react'
import Banner from '../layout/Banner'
import Contact from './Contact'
import Tastimonial from './Tastimonial'

function MainGioiThieu() {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <>
            <Banner title={'Giới Thiệu'} />
            <Contact />
            <Tastimonial />
        </>
    )
}

export default MainGioiThieu