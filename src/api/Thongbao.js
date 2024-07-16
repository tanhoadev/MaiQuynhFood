import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const AddNoti = async ({ dataNoti }) => {
    const { data } = await axios.post(`${BASE_URL}/api/ThongBao/Add`, dataNoti, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const GetAllNoti = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/ThongBao/GetALL`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const UpdateNoti = async ({ dataNoti, id }) => {
    const { data } = await axios.put(`${BASE_URL}/api/ThongBao/update/${id}`, dataNoti, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const DeleteNoti = async ({ id }) => {
    const { data } = await axios.delete(`${BASE_URL}/api/ThongBao/delete/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}