import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GetALLProductCate } from '../../../api/LoaiSP'
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/esm/Spinner';
import AddTaiKhoanNBAd from './AddTaiKhoanNBAd';
import { GetAllEmployee } from '../../../api/user';
import PaginationTKNB from './PaginationTKNB';
import DeleteTKNB from './DeleteTKNB';

function TaiKhoanNoiBoHomeAd() {
    const [load, setLoad] = useState(true)
    const [data, setData] = useState([])
    const [stateData, setStateData] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(8)
    // const { token } = useAuth()
    useEffect(() => {
        setLoad(true)
        GetAllEmployee()
            .then((data) => {
                setData(data)
                setStateData(true)
                setLoad(false)
                console.log(data)
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
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }, [])
    return (
        <main>
            <div className="container-fluid px-4">
                <div className="card mb-4">
                    <AddTaiKhoanNBAd setData={setData} />
                    <div className="card-header">
                        <i className="fas fa-table me-1" /> Loại sản phẩm
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
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>tên / email</th>
                                                {/* <th>Mật khẩu</th> */}
                                                <th>Vai trò</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ height: '600px' }}>
                                            {
                                                currentPosts.length > 0 && currentPosts.map((item, index) => (
                                                    <tr>
                                                        <th>{item.id}</th>
                                                        <td>
                                                            {item.email}
                                                        </td>
                                                        <td>{item.role.join(', ')}</td>
                                                        {/* <td>{item.password}</td> */}
                                                        <th>
                                                            <td className='d-flex gap-2'>
                                                                {/* <UpdateLoaiSanPham
                                                                    currentPage={currentPage}
                                                                    id={item.id}
                                                                    name1={item.categoryName}
                                                                    setData={setData}
                                                                /> */}
                                                                <DeleteTKNB
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
                                    <div className='' style={{ marginLeft: '15px', marginTop: '-6px' }}>
                                        <PaginationTKNB
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

export default TaiKhoanNoiBoHomeAd