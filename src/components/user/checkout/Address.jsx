import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GetDistrict, GetProvince, GetShippingCompany, GetWards, ShippingCost } from '../../../api/Address';

function Address() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [districtsID, setDistrictID] = useState()
    const [serviceId, setServiceId] = useState()
    const [shipCost, setShipCost] = useState()
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
        await ShippingCost({ WardCode: event.target.value, districtsID: districtsID, ServiceID: serviceId })
            .then(data => {
                setShipCost(data.total)
            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error);
            });
    }
    return (
        <>
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
                <h1>{shipCost}</h1>
            </div>
        </>
    );
}

export default Address