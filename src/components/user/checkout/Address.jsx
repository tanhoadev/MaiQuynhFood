import React, { useEffect, useState } from 'react'

function Address() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    useEffect(() => {
        fetch('https://vapi.vnappmob.com/api/province')
            .then(data => {
                console.log(data)
                setProvinces(data.data.data);
            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error);
            });
    }, []);

    const fetchDistricts = (provincesID) => {
        fetch(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${provincesID}&limit=-1`)
            .then(response => response.json())
            .then(data => {
                setDistricts(data.data.data);
            })
            .catch(error => {
                console.error('Lỗi khi gọi API:', error);
            });
    };

    const fetchWards = (districtsID) => {
        fetch(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${districtsID}&limit=-1`)
            .then(response => response.json())
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
                    <option key={province.code} value={province.code}>{province.name}</option>
                ))}
            </select>
            <select id='districts' onChange={handleDistrictChange}>
                <option value=''>-- Chọn quận/huyện --</option>
                {districts.map(district => (
                    <option key={district.code} value={district.code}>{district.name}</option>
                ))}
            </select>
            <select id='wards'>
                <option value=''>-- Chọn phường/xã --</option>
                {wards.map(ward => (
                    <option key={ward.code} value={ward.code}>{ward.name}</option>
                ))}
            </select>
        </div>
    );
}

export default Address