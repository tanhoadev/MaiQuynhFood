import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const GetALLProduct = async () => {
    const { data: { data } } = await axios.get(`${BASE_URL}/api/SanPham/get-all`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const AddProduct = async ({ dataProduct }) => {
    const { data: { data } } = await axios.post(`${BASE_URL}/api/SanPham/add-product`, dataProduct, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data;
}

export const UpdateProduct = async ({ id, dataProduct }) => {
    const { data: { data } } = await axios.put(`${BASE_URL}/api/SanPham/update-sanpham/${id}`, dataProduct, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const DeleteProduct = async ({ id }) => {
    const { data: { data } } = await axios.delete(`${BASE_URL}/api/SanPham/delete-sanpham/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const GetdetailProduct = async ({ id }) => {
    const { data: { data } } = await axios.get(`${BASE_URL}/api/SanPham/get-detail/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}