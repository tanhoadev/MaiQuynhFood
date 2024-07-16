import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS

export const PostComment = async ({ dataComment, token }) => {
    const { data } = await axios.post(`${BASE_URL}/api/BinhLuan/add-binhl`, dataComment, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const GetAllUS = async ({ token }) => {
    const { data } = await axios.get(`${BASE_URL}/api/BinhLuan/get-all`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const GetAllPr = async ({ id }) => {
    const { data } = await axios.get(`${BASE_URL}/api/BinhLuan/get-product/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const DeleteCom = async ({ idproduct, id, token }) => {
    const { data } = await axios.delete(`${BASE_URL}/api/BinhLuan/delete-bl/${idproduct}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}