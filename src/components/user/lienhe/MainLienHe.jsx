import React, { useEffect } from 'react'
import Banner from '../layout/Banner'
import ContactLH from './ContactLH'

function MainLienHe() {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <>
            <Banner title={'Liên Hệ'} />
            <ContactLH />
        </>
    )
}

export default MainLienHe