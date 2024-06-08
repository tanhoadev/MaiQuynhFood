import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Address() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    useEffect(() => {
        axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
            headers: {
                'Content-Type': 'application/json',
                'Token': 'cd374817-241d-11ef-ae41-f654f1114181'
            }
        })
            .then(data => {
                setProvinces(data.data.data);
            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error);
            });
    }, []);

    const fetchDistricts = (provincesID) => {
        axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,
            {
                params: { province_id: provincesID },
                headers: {
                    'Content-Type': 'application/json',
                    'Token': 'cd374817-241d-11ef-ae41-f654f1114181'
                }
            },)
            .then(data => {
                setDistricts(data.data.data);
            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error);
            });
    };

    const fetchWards = (districtsID) => {
        axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`, {
            params: { district_id: districtsID },
            headers: {
                'Content-Type': 'application/json',
                'Token': 'cd374817-241d-11ef-ae41-f654f1114181'
            }
        })
            .then(data => {
                setWards(data.data.data);
            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error);
            });
    };

    const handleProvinceChange = (event) => {
        fetchDistricts(event.target.value);
        setDistricts([]);
        setWards([]);
    };

    const handleDistrictChange = (event) => {
        fetchWards(event.target.value);
        setWards([]);
    };

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
                <select id='wards' className='form-control'>
                    <option value=''>-- Chọn phường/xã --</option>
                    {wards.map(ward => (
                        <option key={ward.code} value={ward.code}>{ward.WardName}</option>
                    ))}
                </select>
            </div>
        </>
    );
}

export default Address