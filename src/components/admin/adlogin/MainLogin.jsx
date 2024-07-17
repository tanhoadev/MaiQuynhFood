import { message } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginAd } from '../../../api/user'
import avt from '../../../assets/img/loginas.png'
import { useAuth } from '../../user/context/AuthContext'

function MainLogin() {
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [ok, setOk] = useState(false)
    const navigate = useNavigate()
    const { isAdmin, setIsAdmin } = useAuth()
    const handleLogin = async () => {
        const dataus = {
            username: name,
            password: pass
        }
        await LoginAd({ dataus })
            .then(data => {
                console.log(data)
                console.log(data.role)
                if (data.role.includes('Admin')) {
                    setIsAdmin(true)
                    localStorage.setItem('isAdmin', 'true');
                    navigate('/admin')
                }
                else {
                    setIsAdmin(false)
                    navigate('/admin')
                }
            })
            .catch(err => {
                message.destroy()
                message.error('Lỗi đăng nhập')
                console.log(err)
            })
    }
    return (
        <>
            <body class="bg-gradient-primary" style={{
                background: `url('https://phandroid.com/wp-content/uploads/2021/06/Windows-11-Wallpaper-2-scaled.jpg') no-repeat center center fixed`,
                backgroundSize: 'cover',
                height: '100vh'
            }}>
                <div className="container">
                    {/* Outer Row */}
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-12 col-md-9">
                            <div className="card o-hidden border-0 shadow-lg my-5">
                                <div className="card-body p-0">
                                    {/* Nested Row within Card Body */}
                                    <div className="row">
                                        <div className="col-lg-6 d-none d-lg-block bg-login-image" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
                                            <img
                                                src={avt}
                                                alt="Admin and customer service job vacancies"
                                                style={{ maxWidth: '100%', maxHeight: '80%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">Đăng Nhập</h1>
                                                </div>
                                                <form method="post" id="changePassForm">
                                                    <div className="mb-3">
                                                        <label
                                                            className="form-label fw-500 cl-change-pass"
                                                        >
                                                            Tài khoản
                                                        </label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control pr-44"
                                                                id="oldpassword-input"
                                                                name="pass"
                                                                value={name}
                                                                onChange={(e) => {
                                                                    setName(e.target.value)
                                                                    if (e.target.value !== '' && pass !== '') {
                                                                        setOk(true)
                                                                    }
                                                                    else {
                                                                        setOk(false)
                                                                    }
                                                                }}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label
                                                            className="form-label fw-500 cl-change-pass"
                                                        >
                                                            Mật khẩu
                                                        </label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <input
                                                                type="password"
                                                                className="form-control pr-44"
                                                                id="oldpassword-input"
                                                                name="pass"
                                                                value={pass}
                                                                onChange={(e) => {
                                                                    setPass(e.target.value)
                                                                    if (e.target.value !== '' && name !== '') {
                                                                        setOk(true)
                                                                    }
                                                                    else {
                                                                        setOk(false)
                                                                    }
                                                                }}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                    </div>
                                                    <input type="hidden" asp-for="Id" />
                                                    <input type="hidden" asp-for="matKhau" />
                                                    <div className="text-center mt-4">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                {ok ?
                                                                    <button className="btn btn-primary w-100" type="button" onClick={handleLogin}>
                                                                        Đăng nhập
                                                                    </button> :
                                                                    <button className="btn btn-primary w-100" type="submit">
                                                                        Đăng nhập
                                                                    </button>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </>

    )
}

export default MainLogin