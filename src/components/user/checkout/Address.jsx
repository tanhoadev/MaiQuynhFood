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
                params: { province_id: 201 },
                headers: {
                    'Content-Type': 'application/json',
                    'Token': 'cd374817-241d-11ef-ae41-f654f1114181'
                }
            },)
            .then(data => {
                console.log(data)
                setDistricts(data.data.data);
            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error);
            });
    };

    const fetchWards = (districtsID) => {
        axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`, {
            params: { district_id: 1542 },
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
        setWards([]);
    };

    const handleDistrictChange = (event) => {
        fetchWards(event.target.value);
    };

    return (
        <div>
            <select id='provinces' onChange={handleProvinceChange}>
                <option value=''>-- Chọn tỉnh/thành phố --</option>
                {provinces.map(province => (
                    <option key={province.code} value={province.code}>{province.ProvinceName}</option>
                ))}
            </select>
            <select id='districts' onChange={handleDistrictChange}>
                <option value=''>-- Chọn quận/huyện --</option>
                {districts.map(district => (
                    <option key={district.code} value={district.code}>{district.DistrictName}</option>
                ))}
            </select>
            <select id='wards'>
                <option value=''>-- Chọn phường/xã --</option>
                {wards.map(ward => (
                    <option key={ward.code} value={ward.code}>{ward.WardName}</option>
                ))}
            </select>
        </div>
    );
}

export default Address