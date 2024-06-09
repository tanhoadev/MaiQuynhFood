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