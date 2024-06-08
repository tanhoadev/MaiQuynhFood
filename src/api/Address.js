import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS

export const GetProvince = async () => {
    const { data: { data } } = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/province`, {
        headers: {
            'Content-Type': 'application/json',
            'Token': TOKEN_ADDRESS
        }
    })
    return data
}

export const GetDistrict = async ({ provincesID }) => {
    const { data: { data } } = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
        params: { province_id: provincesID },
        headers: {
            'Content-Type': 'application/json',
            'Token': TOKEN_ADDRESS
        }
    })
    return data
}

export const GetShippingCompany = async ({ ToDistrict }) => {
    const { data: { data } } = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services', {
        params: {
            "shop_id": 5116460,
            "from_district": 1550,
            "to_district": ToDistrict
        },
        headers: {
            'Content-Type': 'application/json',
            'Token': TOKEN_ADDRESS
        }
    })
    return data
}

export const GetWards = async ({ districtsID }) => {
    const { data: { data } } = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
        params: { district_id: districtsID },
        headers: {
            'Content-Type': 'application/json',
            'Token': TOKEN_ADDRESS
        }
    })
    return data
}

export const ShippingCost = async ({ WardCode, districtsID, ServiceID }) => {
    console.log(`${WardCode} ==== ${districtsID} ===== ${ServiceID}`)
    const { data: { data } } = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
        params: {
            service_id: parseInt(ServiceID), //ID của gói dịch vụ mà bạn chọn (lấy được ở phần 3)
            "insurance_value": 50000, //giá trị đơn hàng
            "coupon": null,
            "from_district_id": 1550, //ID Quận/Huyện người gửi
            "to_district_id": districtsID, //ID Quận/Huyện người nhận
            "to_ward_code": `${WardCode.toString()}`, //ID Phường/ Xã người nhận
            "height": 15, // Chiều cao (cm)
            "length": 15, // Chiều dài (cm)
            "weight": 1000, //trọng lượng hàng hóa (gram)
            "width": 10 //Chiều rộng (cm)
        },
        headers: {
            'Content-Type': 'application/json',
            'Token': TOKEN_ADDRESS
        }
    })
    return data
}