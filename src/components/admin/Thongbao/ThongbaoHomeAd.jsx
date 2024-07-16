import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GetALLProductCate } from '../../../api/LoaiSP'
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/esm/Spinner';
import AddThongBaoAd from './AddThongBaoAd';
import { GetAllNoti } from '../../../api/Thongbao';
import UpdateNotiAd from './UpdateNotiAd';
import DeleteNotiAd from './DeleteNotiAd';
import PaginationNoti from './PaginationNoti';
import { formatISODateTime } from '../../../format/price';

function ThongbaoHomeAd() {
    const [load, setLoad] = useState(true)
    const [data, setData] = useState([])
    const [stateData, setStateData] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(8)
    // const { token } = useAuth()
    useEffect(() => {
        setLoad(true)
        GetAllNoti()
            .then(data => {
                setData(data)
                setLoad(false)
                setStateData(true)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
                setLoad(false)
                setStateData(false)
            })
    }, [])

    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = data.slice(firstPostIndex, lastPostIndex)
    return (
        <main>
            <div className="container-fluid px-4">
                <div className="card mb-4">
                    <AddThongBaoAd setData={setData} />
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
                                                <th>Tiêu đề</th>
                                                <th>Thời gian</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ height: '600px' }}>
                                            {
                                                currentPosts.length > 0 && currentPosts.map((item, index) => (
                                                    <tr>
                                                        <th>{item.id}</th>
                                                        <td>
                                                            {item.title}
                                                        </td>
                                                        <th>{formatISODateTime(`${item.notificationTime}`)}</th>
                                                        <th>
                                                            <td className='d-flex gap-2'>
                                                                <UpdateNotiAd
                                                                    currentPage={currentPage}
                                                                    id={item.id}
                                                                    title1={item.title}
                                                                    writeNoti1={item.contentValue}
                                                                    setData={setData}
                                                                />
                                                                <DeleteNotiAd
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
                                        <PaginationNoti
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

export default ThongbaoHomeAd