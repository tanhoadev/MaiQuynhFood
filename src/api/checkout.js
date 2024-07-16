import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL
const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS

export const GetUrlPayment = async ({ total, token }) => {
    const { data } = await axios.get(`${BASE_URL}/api/Checkout/payment/${total}`, total, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const GetAllInvoice = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/Checkout/GetAllPayment`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const UpdateInvoice = async ({ id, status }) => {
    const { data } = await axios.put(`${BASE_URL}/api/HoaDon/update-status/${id}`, status, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return data;
};

export const GetDetail = async ({ id }) => {
    const { data: { data } } = await axios.get(`${BASE_URL}/api/Checkout/GetDetail/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data;
}

export const GetALLInvoiceUS = async ({ id, token }) => {
    const { data: { data } } = await axios.get(`${BASE_URL}/api/Checkout/GetllAllInvoiceUser/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    return data
}

export const GetAllInvoiceDetail = async ({ id }) => {
    const { data: { data } } = await axios.get(`${BASE_URL}/api/Checkout/GetAllDetailInvoiceUser/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const AddCart = async ({ id, dataCart }) => {
    const { data: { data } } = await axios.post(`${BASE_URL}/api/Cart/AddToCart/${id}`, dataCart, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data;
}

export const UpdateCart = async ({ id, dataCart }) => {
    const { data: { data } } = await axios.put(`${BASE_URL}/api/Cart/UpdateCart/${id}`, dataCart, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const DeleteCart = async ({ id, dataCart }) => {
    const { data: { data } } = await axios.delete(`${BASE_URL}/api/Cart/delete/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: dataCart
    })
    return data
}

export const AddInvoice = async ({ dataInvoice }) => {
    const { data } = await axios.post(`${BASE_URL}/api/Checkout/PaymentSuccess`, dataInvoice, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return data
}

export const DeleteInvoice1 = async ({ id }) => {
    const { data } = await axios.delete(`${BASE_URL}/api/Checkout/Delete/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}