import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS

export const GetALLCart = async ({ id, token }) => {
    const { data: { data } } = await axios.get(`${BASE_URL}/api/Cart/GetAllCart/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const AddCart = async ({ id, dataCart, token }) => {
    const { data: { data } } = await axios.post(`${BASE_URL}/api/Cart/AddToCart/${id}`, dataCart, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return data;
}

export const UpdateCart = async ({ id, dataCart, token }) => {
    const { data: { data } } = await axios.put(`${BASE_URL}/api/Cart/UpdateCart/${id}`, dataCart, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const DeleteCart = async ({ id, dataCart, token }) => {
    const { data: { data } } = await axios.delete(`${BASE_URL}/api/Cart/delete/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: dataCart
    })
    return data
}