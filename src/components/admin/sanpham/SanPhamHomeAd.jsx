import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/esm/Spinner';
import AddSanPhamAd from './AddSanPhamAd';
import PaginationSanPham from './PaginationSanPham';
import { GetALLProduct } from '../../../api/Sanpham';
import UpdateSanPhamAd from './UpdateSanPhamAd';
import DeleteSanPhamAd from './DeleteSanPhamAd';
import { GetALLProductCate } from '../../../api/LoaiSP';
import Form from 'react-bootstrap/Form';
function SanPhamHomeAd() {
    const [load, setLoad] = useState(true)
    const [data, setData] = useState([])
    const [stateData, setStateData] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(8)
    const [dataCate, setDataCate] = useState([])
    const [categoryId, setCategory] = useState()
    const [word, setWord] = useState('')
    const [dataCop, setDataCop] = useState([])

    const handleChanleFind = (e) => {
        setWord(e.target.value)
        if (e.target.value === '') {
            setData(dataCop)
        }
        else {
            const filter = dataCop.filter(x => x.productName.toLowerCase().includes(e.target.value.toLowerCase()));
            setData(filter)
        }
    }
    useEffect(() => {
        GetALLProductCate()
            .then(data => {
                setDataCate(data)
            })
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        setLoad(true)
        GetALLProduct()
            .then((data) => {
                setData(data)
                setStateData(true)
                setDataCop(data)
                setLoad(false)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
                setStateData(false)
                setLoad(false)
            })
    }, [])


    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = data.slice(firstPostIndex, lastPostIndex)
    return (
        <main>
            <div className="container-fluid px-4">
                <div className="card mb-4">
                    <AddSanPhamAd setData={setData} />
                    <div className="card-header">
                        <i className="fas fa-table me-1" /> Sản phẩm
                        <div className="row mt-2">
                            <div className="col-3">
                                <div className="input-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Tên sản phẩm..."
                                        aria-label="Tên sản phẩm..."
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
                                        const value = e.target.value;
                                        if (value === "") {
                                            setData(dataCop); // Hiển thị toàn bộ dữ liệu khi chọn "Tất cả"
                                        } else {
                                            setData(dataCop.filter(x => x.categoryId === parseInt(value))); // Lọc dữ liệu theo categoryId
                                        }
                                        setCategory(value);
                                    }}
                                    value={categoryId}
                                >
                                    <option value="">Tất cả</option>
                                    {dataCate && dataCate.map(item => (
                                        <option key={item.id} value={item.id}>{item.categoryName}</option>
                                    ))}
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
                                                    <th>tên sản phẩm</th>
                                                    <th>loại</th>
                                                    <th>ảnh</th>
                                                    <th>trọng lượng</th>
                                                    <th>Giá</th>
                                                    <th>Hàng tồn</th>
                                                    <th>Lượt thích</th>
                                                    <th>Nguồn gốc</th>
                                                    <th>Thành phần</th>
                                                    <th>Hạn sử dụng</th>
                                                    <th>Mô tả</th>
                                                    <th>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ height: '600px' }}>
                                                {
                                                    currentPosts.length > 0 && currentPosts.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.id}</td>
                                                            <td>{item.productName}</td>
                                                            <td>{item.categoryName}</td>
                                                            <td>
                                                                <img src={item.image} style={{ maxHeight: '120px', borderRadius: '12px' }} alt={item.ten} />
                                                            </td>
                                                            <td>{item.weight} {item.unit}</td>
                                                            <td>{item.price}</td>
                                                            <td>{item.quantitySold}</td>
                                                            <td>{item.favorites}</td>
                                                            <td>{item.origin}</td>
                                                            <td>{item.component}</td>
                                                            <td>{item.expirationDate}</td>
                                                            <td>{item.description}</td>
                                                            <td>
                                                                <div className='d-flex gap-2'>
                                                                    <UpdateSanPhamAd
                                                                        name1={item.productName}
                                                                        weight1={item.weight}
                                                                        unit1={item.unit}
                                                                        quan1={item.quantitySold}
                                                                        origin1={item.origin}
                                                                        desc1={item.description}
                                                                        currentPage={currentPage}
                                                                        price1={item.price}
                                                                        id={item.id}
                                                                        image1={item.image}
                                                                        setData={setData}
                                                                        component1={item.component}
                                                                        expirationDate1={item.expirationDate}
                                                                    />
                                                                    <DeleteSanPhamAd
                                                                        id={item.id}
                                                                        setData={setData}
                                                                    />
                                                                </div>
                                                            </td>
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

export default SanPhamHomeAd