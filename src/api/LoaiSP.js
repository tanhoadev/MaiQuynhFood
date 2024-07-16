import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS

export const GetALLProductCate = async () => {
    const { data: { data } } = await axios.get(`${BASE_URL}/api/LoaiSP/get-all`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const AddProductCate = async ({ datacate }) => {
    const { data: { data } } = await axios.post(`${BASE_URL}/api/LoaiSP/add-category`, datacate, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data;
}

export const UpdateProductCate = async ({ id, datacate }) => {
    const { data: { data } } = await axios.put(`${BASE_URL}/api/LoaiSP/update-loai/${id}`, datacate, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const DeleteProductCate = async ({ id }) => {
    const { data: { data } } = await axios.delete(`${BASE_URL}/api/LoaiSP/delete-loai/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}