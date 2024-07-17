import React, { useEffect, useState } from 'react'
import { GetALLProduct } from '../../../api/Sanpham'
import { AddCart, GetALLCart } from '../../../api/cart'
import { message } from 'antd'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { formatCurrency } from '../../../format/price'
import { useNavigate } from 'react-router-dom'

function Product() {
    const [data, setData] = useState([])
    const [dataCop, setDataCop] = useState([])
    const [datacateTop, setDatacateTop] = useState([])
    const { userData, setNumCart } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        GetALLProduct()
            .then(data => {
                setData(data)
                setDataCop(data)
                // Sử dụng Map để lưu các cặp categoryID và categoryName
                const categoryMap = new Map();

                // Duyệt qua data và thêm các cặp categoryID và categoryName vào Map
                data.forEach(product => {
                    if (!categoryMap.has(product.categoryId)) {
                        categoryMap.set(product.categoryId, product.categoryName);
                    }
                });

                // Chuyển Map thành mảng các đối tượng {categoryID, categoryName}
                const uniqueCategories = Array.from(categoryMap, ([categoryId, categoryName]) => ({
                    categoryId,
                    categoryName
                }));

                // Lưu các giá trị duy nhất vào biến uniqueCategories
                setDatacateTop(uniqueCategories);
            })
            .catch(err => {
                console.log(err)
            })

    }, [])
    const showAll = () => {
        navigate('/cuahang')
    }
    const hanleAddToCart = async ({ id, productName, productUnit, productImage }) => {
        const dataCart =
        {
            "productID": id,
            "productName": productName,
            "quantity": 1,
            "productUnit": productUnit,
            "productImage": productImage
        }
        if (userData) {
            await AddCart({ id: userData.id, dataCart, token: userData.token })
                .then(data => {
                    message.destroy()
                    message.success('Thêm thành công')
                    GetALLCart({ id: userData.id, token: userData.token })
                        .then(data => setNumCart(data.length))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
        else {
            message.destroy()
            message.error('Vui lòng đăng nhập')
        }
    }
    const handleChangeTab = (e) => {
        alert(e.target.value)
    }
    return (
        <>
            {/* Fruits Shop Start*/}
            <div className="container-fluid fruite">
                <div className="container py-5">
                    <div className="tab-class text-center">
                        <div className="row g-4">
                            <div className="col-lg-4 text-start">
                                <h1>Sản Phẩm</h1>
                            </div>
                            <div className="col-lg-8 text-end">
                                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                                    <li className="nav-item">
                                        <button
                                            className="d-flex m-2 py-2 bg-light rounded-pill active"
                                            data-bs-toggle="pill"
                                            onClick={() => {
                                                GetALLProduct()
                                                    .then(data => setData(data))
                                                    .catch(err => console.log(err))
                                            }}
                                        >
                                            <span className="text-dark" style={{ width: 130 }}>
                                                Tất Cả Sản Phẩm
                                            </span>
                                        </button>
                                    </li>
                                    {
                                        datacateTop && datacateTop.map((item, index) => (
                                            <li className="nav-item">
                                                <button
                                                    key={index}
                                                    className="d-flex m-2 py-2 bg-light rounded-pill"
                                                    data-bs-toggle="pill"
                                                    onClick={() => { setData(dataCop.filter(x => x.categoryId === item.categoryId)) }}
                                                >
                                                    <span className="text-dark" style={{ width: 130 }}>
                                                        {item.categoryName}
                                                    </span>
                                                </button>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="tab-content">
                            <div id="tab-1" className="tab-pane fade show p-0 active">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            {
                                                data && data.slice(0, 8).map(item => (
                                                    <div className="col-md-6 col-lg-4 col-xl-3">
                                                        <div className="rounded position-relative fruite-item">
                                                            <Link to={`/chitiet?id=${item.id}`}>
                                                                <div className="fruite-img">
                                                                    <img
                                                                        src={item.image}
                                                                        className="img-fluid w-100 rounded-top"
                                                                        alt=""
                                                                        style={{ maxHeight: '214px', objectFit: 'cover' }}
                                                                    />
                                                                </div>
                                                                <div
                                                                    className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                                                                    style={{ top: 10, left: 10 }}
                                                                >
                                                                    {item.categoryName}
                                                                </div>
                                                            </Link>
                                                            <div className="p-4 border border-secondary border-top-0 rounded-bottom" style={{ height: '161.4px' }}>
                                                                <h4 style={{
                                                                    height: '57px',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    display: '-webkit-box',
                                                                    WebkitLineClamp: 2,
                                                                    WebkitBoxOrient: 'vertical'
                                                                }}>{item.productName}</h4>
                                                                {/* <p>
                                                                    {item.description}
                                                                </p> */}
                                                                <div className="d-flex justify-content-between flex-lg-wrap">
                                                                    <p className="text-dark fs-5 fw-bold mb-0">
                                                                        {formatCurrency(`${item.price}đ`)} / {item.unit}
                                                                    </p>
                                                                    <button
                                                                        onClick={() => { hanleAddToCart({ id: item.id, productName: item.productName, productUnit: item.unit, productImage: item.image }) }}
                                                                        className="btn border border-secondary rounded-pill px-3 text-primary"
                                                                    >
                                                                        <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                                                                        Giỏ hàng
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4 mt-3">
                        <div className="col-lg-12 d-flex justify-content-center">
                            <button className='btn btn-primary border-2 border-secondary py-3 px-4 rounded-pill text-white h-100' onClick={showAll}>Xem Tất cả</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Fruits Shop End*/}
        </>

    )
}

export default Product