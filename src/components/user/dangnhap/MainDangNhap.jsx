import React, { useEffect, useState } from 'react'
import Banner from '../layout/Banner'
import { Link } from 'react-router-dom'
import Capcha from '../layout/Capcha'
import { ActiveAccount, LoginUser } from '../../../api/user'
import { message } from 'antd'
import { useAuth } from '../context/AuthContext'
import { Spinner } from 'react-bootstrap'
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from 'react-router-dom';

import {
    Alert,
    Button,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
} from "@mui/material";

function MainDangNhap() {
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [text, setText] = useState('');
    const isFormValid = name !== '' && pass !== '' && text !== '';
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key');
    const { login } = useAuth()
    const [load, setLoad] = useState(false)
    const randomString = Math.random().toString(36).slice(8);
    const [captcha, setCaptcha] = useState(randomString);
    const [valid, setValid] = useState(false);
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!regex.test(password)) {
            setError('Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.');
        } else {
            setError('');
        }
    };
    const checkLogin = async () => {
        setLoad(true)
        validatePassword(pass)
        if (text === captcha) {
            setValid(false);
            // setSuccess(true);
            const dataUser = {
                email: name,
                password: pass
            }

            await LoginUser({ dataUser })
                .then(data => {
                    message.destroy()
                    message.success('Đăng nhập thành công')
                    navigate('/')
                    setLoad(false)
                    login(data.userLogin)
                })
                .catch(err => {
                    message.error('Tài khoản hoặc mật khẩu không chính xác')
                    setLoad(false)
                    refreshString()
                })
        } else {
            setValid(true);
            setLoad(false)
        }
    }

    const refreshString = () => {
        setText('');
        setCaptcha(Math.random().toString(36).slice(8));
    };
    useEffect(() => {
        window.scroll(0, 0)
        if (key !== null) {
            ActiveAccount({ key })
                .then(data => {
                    message.success('Tài khoản đã được kích hoạt')
                }
                )
                .catch(err => {
                    console.log(err)
                })
        }
    }, [])
    return (
        <>
            <style>
                {`
                    .cardcap {
                    }

                    .h3cap {
                        color: #fff;
                        text-decoration: line-through;
                        user-select: none;
                        background-color: black;
                        border-radius: 5px;
                        width: 100px;
                        height: 30px;
                        font-size: 22px;
                        margin-bottom: auto;
                    }
                `}
            </style>
            <Banner title="Đăng nhập" />
            <div className="auth-bg mt-5">
                <div className="container-fluid">
                    <div className="row g-0 justify-content-center">
                        <div className="card col-lg-8 col-xl-7 col-md-11">
                            <div className="card-body authentication-page-content">
                                <div className="d-flex flex-column h-100 px-4 pt-4">
                                    <div className="row justify-content-center my-auto">
                                        <div className="col-sm-8 col-lg-8 col-xl-7 col-xxl-8" style={{ maxWidth: '550px' }}>
                                            <div className="">

                                                <form id="changePassForm">
                                                    <div className="mb-3">
                                                        <label
                                                            className="form-label fw-500 cl-change-pass"
                                                        >
                                                            Email
                                                        </label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <input
                                                                type="email"
                                                                className="form-control pr-44"
                                                                id="oldpassword-input"
                                                                name="pass"
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
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
                                                                onChange={(e) => setPass(e.target.value)}
                                                                required
                                                            />
                                                            {/* {error && <div className="text-danger">{error}</div>} */}
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <CardActions>
                                                            <div className="h3cap text-center">{captcha}</div>
                                                            <Button
                                                                startIcon={<RefreshIcon />}
                                                                onClick={() => refreshString()}
                                                            ></Button>
                                                        </CardActions>
                                                        <TextField
                                                            label="Nhập mã xác thực"
                                                            focused
                                                            required
                                                            value={text}
                                                            fullWidth
                                                            onChange={(e) => setText(e.target.value)}
                                                            error={valid}
                                                            helperText={valid && "Mã không hợp lệ"}
                                                        />
                                                    </div>
                                                    <input type="hidden" asp-for="Id" />
                                                    <input type="hidden" asp-for="matKhau" />
                                                    <div className="text-center mt-4">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                {isFormValid ? (
                                                                    <>
                                                                        {/* <Capcha name={name} pass={pass} /> */}
                                                                        {
                                                                            load ?
                                                                                <>
                                                                                    <button className="btn btn-primary w-100" type="button" disabled>
                                                                                        <Spinner animation="border" style={{ height: '20px', width: '20px' }} role="status">
                                                                                        </Spinner>
                                                                                    </button>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <button className="btn btn-primary w-100" type="button" onClick={checkLogin}>
                                                                                        Đăng nhập
                                                                                    </button>
                                                                                </>
                                                                        }
                                                                    </>
                                                                ) : (
                                                                    <button className="btn btn-primary w-100" type="submit">
                                                                        Đăng nhập
                                                                    </button>
                                                                )}

                                                                <hr />
                                                                <div className="text-center">
                                                                    <Link to='/dangki'>Tạo tài khoản</Link>
                                                                </div>
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
                </div >
            </div >
        </>
    )
}

export default MainDangNhap