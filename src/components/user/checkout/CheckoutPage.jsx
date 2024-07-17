import React, { useEffect, useState } from 'react'
import Address from './Address'
import { AddInvoice, GetUrlPayment } from '../../../api/checkout'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GetDistrict, GetProvince, GetShippingCompany, GetWards, ShippingCost } from '../../../api/Address';
import { message } from 'antd';
import { GetALLCart } from '../../../api/cart';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../../../format/price';

function CheckoutPage() {
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [districtsID, setDistrictID] = useState()
    const [serviceId, setServiceId] = useState()
    const [shipCost, setShipCost] = useState()
    const [totalCost, setTotalCost] = useState()
    const [province, setProvince] = useState()
    const [district, setDistrict] = useState()
    const [ward, setWard] = useState()
    const [houseNumber, setHouseNumber] = useState()
    const [receiverName, setReceiverName] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [moreInfo, setMoreInfo] = useState()
    const [data, setData] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);
    const { userData } = useAuth()
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
    useEffect(() => {
        GetProvince()
            .then(data => {
                setProvinces(data);
            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error);
            });
    }, []);

    const fetchDistricts = async (provincesID) => {
        await GetDistrict({ provincesID })
            .then(data => {
                setDistricts(data);
            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error);
            });
    };

    const fetchWards = async (districtsID) => {
        await GetWards({ districtsID })
            .then(async data => {
                setWards(data);
                await GetShippingCompany({ ToDistrict: districtsID })
                    .then(data => {
                        setServiceId([data[0].service_id])
                    })
                    .catch(error => {
                        console.error('Lỗi khi gọi API:', error);
                    });
            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error);
            });
    };

    const handleProvinceChange = (event) => {
        var idpro = parseInt(event.target.value)
        var x = provinces.filter(x => x.ProvinceID === idpro)
        setProvince(x[0].ProvinceName)
        fetchDistricts(event.target.value);
        setDistricts([]);
        setShipCost()
        setWards([]);
    };

    const handleDistrictChange = (event) => {
        setWards([]);
        setShipCost()
        if (event.target.value) {
            setDistrictID(event.target.value)
        }
        fetchWards(event.target.value);
    };

    const HandleChangeWard = async (event) => {
        const nameWard = wards.filter(x => x.WardCode === event.target.value)
        const districtsIDss = parseInt(districtsID)
        const districtName = districts.filter(x => x.DistrictID === districtsIDss)
        setDistrict(districtName[0].DistrictName)
        setWard(nameWard[0].WardName)
        await ShippingCost({ WardCode: event.target.value, totalPrice: totalPrice, districtsID: districtsID, ServiceID: serviceId })
            .then(data => {
                setShipCost(data.total)
            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error);
            });
    }
    // const []
    useEffect(() => {
        // Lấy URL hiện tại
        const urlParams = new URLSearchParams(window.location.search);
        const vnp_ResponseCode = urlParams.get('vnp_ResponseCode');
        const vnp_TransactionStatus = urlParams.get('vnp_TransactionStatus');

        // Kiểm tra các tham số cần thiết
        if (vnp_ResponseCode && vnp_TransactionStatus) {
            if (vnp_ResponseCode === "00" && vnp_TransactionStatus === "00") {
                const savedFormData = JSON.parse(localStorage.getItem('formData'));
                if (savedFormData) {
                    const dataInvoice = {
                        "customerId": savedFormData.customerId,
                        "province": savedFormData.province,
                        "district": savedFormData.district,
                        "ward": savedFormData.ward,
                        "houseNumber": savedFormData.houseNumber,
                        "receiverName": savedFormData.receiverName,
                        "phoneNumber": savedFormData.phoneNumber,
                        "email": savedFormData.email,
                        "deliveryFee": savedFormData.deliveryFee
                    }
                    AddInvoice({ dataInvoice })
                        .then(data => {
                            localStorage.removeItem("formData")
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    // Gọi API PaymentCallback của backend
                    navigate('/lichsu');
                    message.success('Giao dịch thành công')
                }
            }
        }
    }, [navigate]);
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    const handleCheckout = async () => {
        if (name !== undefined && email !== undefined && phoneNumber !== undefined && province !== undefined && district !== undefined && ward !== undefined && houseNumber !== undefined) {
            const formData = {
                customerId: userData.id,
                province: province,
                district: district,
                ward: ward,
                houseNumber: houseNumber,
                receiverName: name,
                phoneNumber: phoneNumber,
                email: email,
                deliveryFee: shipCost,
            };
            localStorage.setItem('formData', JSON.stringify(formData));
            await GetUrlPayment({ total: shipCost + totalPrice, token: userData.token })
                .then(data => {
                    window.location.replace(data)
                })
                .catch(err => console.log(err))
        }
        else {
            message.destroy()
            message.error('Vui lòng nhập đầy đủ thông tin trước khi thanh toán')
        }
    }
    return (
        <>
            {/* Checkout Page Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Thông tin khách hàng</h1>
                    <form action="#">
                        <div className="row g-5">
                            <div className="col-md-12 col-lg-6 col-xl-7">
                                <div className="form-item">
                                    <label className="form-label my-3">
                                        Họ và tên<sup>*</sup>
                                    </label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">
                                        Số điện thoại <sup>*</sup>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">
                                        Email <sup>*</sup>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="">
                                    <label className="form-label my-3">
                                        Tỉnh/ Thành <sup>*</sup>
                                    </label>
                                    <select id='provinces' className='form-control' onChange={handleProvinceChange}>
                                        <option value=''>-- Chọn tỉnh/thành phố --</option>
                                        {provinces.map(province => (
                                            <option key={province.code} value={province.ProvinceID}>{province.ProvinceName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="">
                                    <label className="form-label my-3">
                                        Quận/ Huyện <sup>*</sup>
                                    </label>
                                    <select id='districts' className='form-control' onChange={handleDistrictChange}>
                                        <option value=''>-- Chọn quận/huyện --</option>
                                        {districts.map(district => (
                                            <option key={district.code} value={district.DistrictID}>{district.DistrictName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="">
                                    <label className="form-label my-3">
                                        Phường/ Xã <sup>*</sup>
                                    </label>
                                    <select id='wards' className='form-control' onChange={HandleChangeWard}>
                                        <option value=''>-- Chọn phường/xã --</option>
                                        {wards.map(ward => (
                                            <option key={ward.code} value={ward.WardCode}>{ward.WardName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">
                                        Số nhà/ Tên đường <sup>*</sup>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={houseNumber}
                                        onChange={(e) => setHouseNumber(e.target.value)}
                                    />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">
                                        Thông tin thêm <sup>*</sup>
                                    </label>
                                    <textarea
                                        name="text"
                                        className="form-control"
                                        spellCheck="false"
                                        cols={30}
                                        rows={11}
                                        placeholder="Ghi chú"
                                        value={moreInfo}
                                        onChange={(e) => setMoreInfo(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-6 col-xl-5">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" style={{ color: 'transparent' }}>Products</th>
                                                <th scope="col">Sản phẩm</th>
                                                <th scope="col">Giá</th>
                                                <th scope="col">SL</th>
                                                <th scope="col">Tổng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data && data.map((item, index) => (
                                                <tr>
                                                    <th scope="row">
                                                        <div className="d-flex align-items-center mt-2">
                                                            <img
                                                                src={item.productImage}
                                                                className="img-fluid rounded-circle"
                                                                style={{ width: 90, height: 90 }}
                                                                alt=""
                                                            />
                                                        </div>
                                                    </th>
                                                    <td className="py-5">{item.productName}</td>
                                                    <td className="py-5">{formatCurrency(`${item.price}đ`)}</td>
                                                    <td className="py-5">{item.quantity}</td>
                                                    <td className="py-5">{formatCurrency(`${item.productPrice}`)}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <th scope="row"></th>
                                                <td className="py-5">
                                                    <p className="mb-0 text-dark py-4">Các loại phí</p>
                                                </td>
                                                <td colSpan={3} className="py-5">

                                                    <div className="form-check text-start" style={{ display: 'visible' }}>
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input bg-primary border-0"
                                                            id="Shipping-2"
                                                            name="Shipping-1"
                                                            defaultValue="Shipping"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="Shipping-2"
                                                        >
                                                            Sản phẩm: {formatCurrency(`${totalPrice}đ`)}
                                                        </label>
                                                    </div>
                                                    <div className="form-check text-start">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input bg-primary border-0"
                                                            id="Shipping-3"
                                                            name="Shipping-1"
                                                            defaultValue="Shipping"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="Shipping-3"
                                                        >
                                                            vận chuyển: {shipCost && formatCurrency(`${shipCost}đ`)}
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row"></th>
                                                <td className="py-5">
                                                    <p className="mb-0 text-dark text-uppercase py-3">
                                                        Tổng cộng
                                                    </p>
                                                </td>
                                                <td className="py-5" />
                                                <td className="py-5" />
                                                <td className="py-5">
                                                    <div className="py-3 border-bottom border-top">
                                                        <p className="mb-0 text-dark">{shipCost && formatCurrency(`${shipCost + totalPrice}đ`)}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                                    <button
                                        type="button"
                                        className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                                        onClick={() => { handleCheckout() }}
                                    >
                                        Thanh toán
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* Checkout Page End */}
        </>

    )
}

export default CheckoutPage