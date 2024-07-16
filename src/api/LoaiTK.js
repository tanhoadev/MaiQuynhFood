import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS

export const GetALLCustomerCate = async () => {
    const { data: { data } } = await axios.get(`${BASE_URL}/api/LoaiKH/get-all`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const AddCustomerCate = async ({ datacate }) => {
    const { data: { data } } = await axios.post(`${BASE_URL}/api/LoaiKH/add-loaikh`, datacate, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data;
}

export const UpdateCustomerCate = async ({ id, datacate }) => {
    const { data: { data } } = await axios.put(`${BASE_URL}/api/LoaiKH/update-loai/${id}`, datacate, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const DeleteCustomerCate = async ({ id }) => {
    const { data: { data } } = await axios.delete(`${BASE_URL}/api/LoaiKH/delete-loai/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}