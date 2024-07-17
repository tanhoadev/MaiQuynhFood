import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GetALLProductCate } from '../../../api/LoaiSP'
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/esm/Spinner';
import AddTaiKhoanKhachAd from './AddTaiKhoanKhachAd';
import { GetALLUser } from '../../../api/user';
import PaginationKhachHangAd from './PaginationKhachHangAd';
import UpdateTaiKhoanKH from './UpdateTaiKhoanKH';
import DeleteTaiKhoanKH from './DeleteTaiKhoanKH';

function TaiKhoanKhachHomeAd() {
    const [load, setLoad] = useState(true)
    const [data, setData] = useState([])
    const [stateData, setStateData] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(8)
    // const { token } = useAuth()
    useEffect(() => {
        setLoad(true)
        GetALLUser()
            .then((data) => {
                setData(data)
                setStateData(true)
                setLoad(false)
            })
            .catch(err => {
                setStateData(false)
                setLoad(false)
            })
    }, [])

    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = data.slice(firstPostIndex, lastPostIndex)
    useEffect(() => {
        GetALLProductCate()
            .then(data => { })
            .catch(err => console.log(err))
    }, [])
    return (
        <main>
            <div className="container-fluid px-4">
                <div className="card mb-4">
                    <AddTaiKhoanKhachAd setData={setData} />
                    <div className="card-header">
                        <i className="fas fa-table me-1" /> khách hàng
                    </div>
                    {
                        load ?
                            <div className='container'>
                                <div className="row justify-content-center">
                                    <Spinner animation="border" role="status">
                                    </Spinner>
                                </div>
                            </div>
                            :
                            stateData ?
                                <>
                                    <div style={{ overflowX: 'auto' }}>

                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>id</th>
                                                    <th>Tên tài khoản</th>
                                                    <th>Email</th>
                                                    <th>Họ tên</th>
                                                    <th>Ảnh</th>
                                                    <th>Số điện thoại</th>
                                                    <th>Trạng thái</th>
                                                    <th>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ height: '600px' }}>
                                                {
                                                    currentPosts.length > 0 && currentPosts.map((item, index) => (
                                                        <tr>
                                                            <th>{item.id}</th>
                                                            <td>{item.name}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.fullName}</td>
                                                            <td><img src={item.image} style={{ maxHeight: '120px', borderRadius: '12px' }} alt={item.ten} /></td>
                                                            <td>{item.phoneNumber}</td>
                                                            <td>{item.isActive}</td>
                                                            <th>
                                                                <td className='d-flex gap-2'>
                                                                    <UpdateTaiKhoanKH
                                                                        currentPage={currentPage}
                                                                        id={item.id}
                                                                        name1={item.name}
                                                                        email1={item.email}
                                                                        isActive1={item.isActive}
                                                                        customerCateID1={item.customerCateID}
                                                                        setData={setData}
                                                                    />
                                                                    <DeleteTaiKhoanKH
                                                                        id={item.id}
                                                                        setData={setData}
                                                                    />
                                                                </td>
                                                            </th>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className='' style={{ marginLeft: '15px', marginTop: '-6px' }}>
                                        <PaginationKhachHangAd
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            totalPosts={data.length}
                                            PostsPerPage={postsPerPage} />
                                    </div>
                                </>
                                : <span className='text-center text-danger'>An error occurred while transferring data.</span>
                    }
                </div>
            </div>
        </main>
    )
}

export default TaiKhoanKhachHomeAd