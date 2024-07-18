import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GetALLProductCate } from '../../../api/LoaiSP'
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/esm/Spinner';
import { GetAllInvoice, GetDetail, UpdateInvoice } from '../../../api/checkout';
import DetailsHD from './DetailsHD';
import DeleteInvoice from './DeleteInvoice';
import PaginationSanPham from '../sanpham/PaginationSanPham';
import Form from 'react-bootstrap/Form';
import { formatISODateTime } from '../../../format/price'
import swal from 'sweetalert';
function HoaDonHomeAd() {
    const [load, setLoad] = useState(true)
    const [data, setData] = useState([])
    const [stateData, setStateData] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(8)
    const [dataDetail, setDataDetails] = useState([])
    const [word, setWord] = useState('')
    const [dataCop, setDataCop] = useState([])
    const [dataStatus, setDataStatus] = useState('')
    function handleUpdate(trangThai, item) {
        if (trangThai === 2) {
            const status = {
                "status": 'Đang giao hàng'
            }
            UpdateInvoice({ id: item.id, status })
                .then(data => {
                    setData(data)
                    swal({
                        title: "Thành công!",
                        text: "Hóa đơn đã cập nhật thành công!",
                        icon: "success",
                    });
                })
                .catch(err => {
                    console.log(err)
                })
        }
        if (trangThai === 3) {
            const status = {
                "status": 'Đã giao hàng'
            }
            UpdateInvoice({ id: item.id, status })
                .then(data => {
                    setData(data)
                    swal({
                        title: "Thành công!",
                        text: "Hóa đơn đã cập nhật thành công!",
                        icon: "success",
                    });
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    // const { token } = useAuth()
    useEffect(() => {
        setLoad(true)
        GetAllInvoice()
            .then((data) => {
                setData(data)
                setStateData(true)
                setDataCop(data)
                setLoad(false)
            })
            .catch(err => {
                setStateData(false)
                setLoad(false)
            })
    }, [])
    const handleClick = async (id) => {
        await GetDetail({ id })
            .then(data => {
                setDataDetails(data)
            })
            .catch(err => console.log(err))
    }
    const handleChanleFind = (e) => {
        setWord(e.target.value)
        if (e.target.value === '') {
            if (dataStatus !== '') {
                const filter = dataCop.filter(x => x.receiverName.toLowerCase().includes(e.target.value.toLowerCase()) && x.status === dataStatus);
                setData(filter)

            }
            else {
                setData(dataCop)
            }
        }
        else {
            if (dataStatus !== '') {
                const filter = dataCop.filter(x => x.receiverName.toLowerCase().includes(e.target.value.toLowerCase()) && x.status === dataStatus);
                setData(filter)

            }
            else {
                const filter = dataCop.filter(x => x.receiverName.toLowerCase().includes(e.target.value.toLowerCase()));
                setData(filter)
            }
        }
    }
    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = data.slice(firstPostIndex, lastPostIndex)

    return (
        <main>
            <div className="container-fluid px-4">
                <div className="card mb-4">
                    {/* <AddLoaiSanPhamAd setData={setData} /> */}
                    <div className="card-header">
                        <i className="fas fa-table me-1" /> Hóa đơn
                        <div className="row mt-2">
                            <div className="col-3">
                                <div className="input-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Tên khách hàng..."
                                        aria-label="Tên khách hàng..."
                                        aria-describedby="btnNavbarSearch"
                                        value={word}
                                        onChange={handleChanleFind}
                                    />
                                    <button className="btn btn-primary" id="btnNavbarSearch" type="button">
                                        <i className="fas fa-search" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-3">
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={(e) => {
                                        setDataStatus(e.target.value)
                                        const value = e.target.value;
                                        if (value === "") {
                                            if (word !== '') {
                                                setData(dataCop.filter(x => x.receiverName === word))
                                            }
                                            else {
                                                setData(dataCop); // Hiển thị toàn bộ dữ liệu khi chọn "Tất cả"
                                            }
                                        } else {
                                            if (word !== '') {
                                                setData(dataCop.filter(x => x.status === value && x.receiverName === word))
                                            }
                                            else {
                                                setData(dataCop.filter(x => x.status === value)); // Lọc dữ liệu theo categoryId
                                            }
                                        }
                                        // setCategory(value);
                                    }}
                                >
                                    <option value="">Tất cả trạng thái</option>
                                    <option value="Đang xử lý">Đang xử lý</option>
                                    <option value="Đang giao hàng">Đang giao hàng</option>
                                    <option value="Đã giao hàng">Đã giao hàng</option>
                                    {/* {dataCate && dataCate.map(item => (
                                        <option key={item.id} value={item.id}>{item.categoryName}</option>
                                    ))} */}
                                </Form.Select>
                            </div>
                        </div>
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
                                                    <th>Tỉnh/ Thành</th>
                                                    <th>Quận/ Huyện</th>
                                                    <th>Phường/ Xã</th>
                                                    <th>Số nhà</th>
                                                    <th>Người nhận</th>
                                                    <th>Số điện thoại</th>
                                                    <th>Email</th>
                                                    <th>Ngày đặt</th>
                                                    <th>Trạng thái</th>
                                                    <th>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ height: '600px' }}>
                                                {
                                                    currentPosts.length > 0 && currentPosts.map((item, index) => (
                                                        <tr>
                                                            <th>{item.id}</th>
                                                            <td>{item.customerName}</td>
                                                            <td>{item.province}</td>
                                                            <td>{item.district}</td>
                                                            <td>{item.ward}</td>
                                                            <td>{item.houseNumber}</td>
                                                            <td>{item.receiverName}</td>
                                                            <td>{item.phoneNumber}</td>
                                                            <td>{item.email}</td>
                                                            <td>{formatISODateTime(item.orderDate)}</td>
                                                            {
                                                                item.status === '' && <td className='text-danger fw-bold'>chưa làm</td>
                                                            }
                                                            {
                                                                item.status === 'Đang xử lý' && <td style={{ color: '#ffca2c' }} className='fw-bold'>{item.status}</td>
                                                            }
                                                            {
                                                                item.status === 'Đang giao hàng' && <td className='text-info fw-bold'>Đang giao hàng</td>
                                                            }
                                                            {
                                                                item.status === 'Đã giao hàng' && <td className='text-success fw-bold'>Đã giao hàng</td>
                                                            }
                                                            <th>
                                                                <td className='d-flex gap-2'>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target={`#ModalCate${item.id}`}
                                                                        data-bs-whatever="@mdo"
                                                                        onClick={() => handleClick(item.id)}
                                                                    >
                                                                        <i class="fa-solid fa-eye"></i>
                                                                    </button>
                                                                    <DetailsHD data={dataDetail} id={item.id} />
                                                                    {/* <UpdateLoaiSanPham
                                                                    currentPage={currentPage}
                                                                    id={item.id}
                                                                    name1={item.categoryName}
                                                                    setData={setData}
                                                                /> */}
                                                                    <DeleteInvoice
                                                                        id={item.id}
                                                                        setData={setData}
                                                                    />
                                                                    <button className='btn btn-info' onClick={() => handleUpdate(2, item)}>
                                                                        Đang giao hàng
                                                                    </button>
                                                                    <button className='btn btn-success' onClick={() => handleUpdate(3, item)}>
                                                                        Đã giao hàng
                                                                    </button>
                                                                </td>
                                                            </th>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className='' style={{ marginLeft: '15px', marginTop: '-6px' }}>
                                        <PaginationSanPham
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

export default HoaDonHomeAd