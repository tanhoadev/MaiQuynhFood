import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { DeleteCart, GetALLCart, UpdateCart } from '../../../api/cart';
import { message } from 'antd';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../../../format/price';

function CartPage() {
    const [data, setData] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);
    const { userData, setNumCart } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (userData) {
            GetALLCart({ id: userData.id, token: userData.token })
                .then(data => {
                    setData(data)
                    // Tính tổng productPrice
                    const total = data.reduce((acc, item) => acc + item.productPrice, 0);
                    setTotalPrice(total);
                })
                .catch(err => console.log(err))
        }
    }, [userData])
    const handleChekout = () => {
        window.location.href = "/thanhtoan";
    }
    const handleUpdateCart = async ({ id, quantity }) => {
        const dataCart = {
            quantity,
            cartId: data[0].cardID,
        }
        if (quantity === 0) {
            const x = {
                cartId: data[0].cardID
            }
            await DeleteCart({ id: id, dataCart: x, token: userData.token })
                .then(data => {
                    setData(data)
                    setNumCart(data.length)
                    const total = data.reduce((acc, item) => acc + item.productPrice, 0);
                    setTotalPrice(total);
                })
                .catch(err => {
                    console.log(err)
                    message.error('err')
                }
                )
        }
        else {
            await UpdateCart({ id, dataCart, token: userData.token })
                .then(data => {
                    setData(data)
                    setNumCart(data.length)
                    const total = data.reduce((acc, item) => acc + item.productPrice, 0);
                    setTotalPrice(total);
                })
                .catch(err => {
                    console.log(err)
                    message.error('err')
                }
                )
        }

    }
    const handleDelete = async ({ id }) => {
        const dataCart = {
            cartId: data[0].cardID
        }
        await DeleteCart({ id, dataCart, token: userData.token })
            .then(data => {
                setData(data)
                setNumCart(data.length)
            })
            .catch(err => {
                console.log(err)
                message.error('err')
            }
            )
    }
    return (
        <>
            {/* Cart Page Start */}
            <div className="container-fluid py-5">
                {
                    data.length === 0 ?
                        <div className='d-flex justify-content-center'>
                            <img className='' src="https://soldiamondsinc.com/assets/images/empty-cart.png" alt="" />
                        </div>
                        :
                        <div className="container py-5">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Products</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data && data.map((item, index) => (
                                                <tr>
                                                    <th scope="row">
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src={item.productImage}
                                                                className="img-fluid me-5 rounded-circle"
                                                                style={{ width: 80, height: 80 }}
                                                                alt=""
                                                            />
                                                        </div>
                                                    </th>
                                                    <td>
                                                        <p className="mb-0 mt-4">{item.productName}</p>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 mt-4">{formatCurrency(`${item.price}đ`)}</p>
                                                    </td>
                                                    <td>
                                                        <div
                                                            className="input-group quantity mt-4"
                                                            style={{ width: 100 }}
                                                        >
                                                            <div className="input-group-btn" onClick={() => handleUpdateCart({ id: item.id, quantity: item.quantity - 1 })}>
                                                                <button className="btn btn-sm btn-minus rounded-circle bg-light border">
                                                                    <i className="fa fa-minus" />
                                                                </button>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm text-center border-0"
                                                                value={item.quantity}
                                                            />
                                                            <div className="input-group-btn">
                                                                <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => handleUpdateCart({ id: item.id, quantity: item.quantity + 1 })}>
                                                                    <i className="fa fa-plus" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="mb-0 mt-4">{formatCurrency(`${item.productPrice}đ`)}</p>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={() => handleDelete({ id: item.id })}>
                                                            <i className="fa fa-times text-danger" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className="row g-4 justify-content-end">
                                <div className="col-8">
                                </div>
                                <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                                    <div className="bg-light rounded">
                                        <div className="p-4">
                                            <h1 className="display-6 mb-4">
                                                Cộng <span className="fw-normal">giỏ hàng</span>
                                            </h1>
                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="mb-0 me-4">Tạm tính:</h5>
                                                <p className="mb-0">{formatCurrency(`${totalPrice}đ`)}</p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <h5 className="mb-0 me-4">phí vận chuyển</h5>
                                                <div className="">
                                                    <p className="mb-0"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                            <h5 className="mb-0 ps-4 me-4">Tổng</h5>
                                            <p className="mb-0 pe-4">{formatCurrency(`${totalPrice}đ`)}</p>
                                        </div>
                                        {
                                            data.length > 0 &&
                                            <Link
                                                className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                                                to='/thanhtoan'>Thanh Toán</Link>

                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
            {/* Cart Page End */}
        </>

    )
}

export default CartPage