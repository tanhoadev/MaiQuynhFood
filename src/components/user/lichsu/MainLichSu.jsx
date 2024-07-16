import React, { useEffect, useState } from 'react'
import Banner from '../layout/Banner'
import StartLichsu from './StartLichsu'
import { GetALLInvoiceUS } from '../../../api/checkout'
import { useAuth } from '../context/AuthContext'

function MainLichSu() {
    const [dataIv, setDataIv] = useState([])
    const { userData } = useAuth()
    useEffect(() => {
        if (userData) {
            GetALLInvoiceUS({ id: userData.id, token: userData.token })
                .then(data => {
                    setDataIv(data)
                })
                .catch(err => console.log(err))
        }
    }, [userData])
    return (
        <>
            <Banner title="Lịch sử" />
            {dataIv.length === 0 ?
                <>
                    <div className='d-flex justify-content-center'>
                        <div className="row text-center">
                            <div className="col-12">
                                <img className='' src="https://th.bing.com/th/id/OIP.1iT_8GwnM1OndAs9nbn0YwHaHa?rs=1&pid=ImgDetMain" width={'230px'} alt="" />
                            </div>
                            <p className='fw-bold' style={{ textAlign: 'center', fontSize: '18px' }}>Bạn chưa có đơn đặt hàng nào</p>
                        </div>

                        {/* <h1>Bạn chưa có đơn đặt hàng nào</h1> */}
                    </div></>
                :
                <>
                    {dataIv && dataIv.map((item, index) => (
                        <StartLichsu name={item.receiverName} email={item.email} phone={item.phone} province={item.province} district={item.district} ward={item.ward} houseNum={item.houseNumber} time={item.orderTime} id={item.id} status={item.status} sum={item.sum} total={item.total} />
                    ))}
                </>
            }

        </>
    )
}

export default MainLichSu