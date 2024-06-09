import axios from 'axios'
import React, { useEffect } from 'react'
import { GetALLProductCate } from '../../../api/LoaiSP'

function LoaiSanPhamAd() {
    useEffect(() => {
        GetALLProductCate()
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div>LoaiSanPhamAd</div>
    )
}

export default LoaiSanPhamAd