import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL

export const GetALLUser = async () => {
    const { data: { data } } = await axios.get(`${BASE_URL}/api/User/getall`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const GetAllEmployee = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/Auth/get-all`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const AddUser = async ({ dataUser }) => {
    const { data: { data } } = await axios.post(`${BASE_URL}/api/User/add`, dataUser, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data;
}

export const LoginUser = async ({ dataUser }) => {
    const { data } = await axios.post(`${BASE_URL}/api/User/login`, dataUser, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const UpdateUser = async ({ id, dataUser }) => {
    const { data: { data } } = await axios.put(`${BASE_URL}/api/User/update-user/${id}`, dataUser, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const DeleteUser = async ({ id }) => {
    const { data: { data } } = await axios.delete(`${BASE_URL}/api/User/delete/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const DeleteEmployee = async ({ id }) => {
    const { data } = await axios.delete(`${BASE_URL}/api/Auth/Delete/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const AddEmployeeeeee = async ({ dataem }) => {
    const { data } = await axios.post(`${BASE_URL}/api/AuthJwt/register-Employee`, dataem, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const AddEmployee = async ({ dataem }) => {
    const { data } = await axios.post(`${BASE_URL}/api/AuthJwt/register-admin`, dataem, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const RegisterCus = async ({ dataUser }) => {
    const { data } = await axios.post(`${BASE_URL}/api/User/register`, dataUser, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const LoginAd = async ({ dataus }) => {
    const { data } = await axios.post(`${BASE_URL}/api/AuthJwt/Login`, dataus, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const ActiveAccount = async ({ key }) => {
    const { data } = await axios.get(`${BASE_URL}/api/User/active/${key}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const UpdateUsser = async ({ userDatas, id }) => {
    const { data } = await axios.put(`${BASE_URL}/api/User/update-info/${id}`, userDatas, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const UpdatePassUsser = async ({ userDatas }) => {
    const { data } = await axios.put(`${BASE_URL}/api/User/changepass`, userDatas, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}

export const UpdatePassUsserOK = async ({ userDatas }) => {
    const { data } = await axios.put(`${BASE_URL}/api/User/changepassOK`, userDatas, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data
}