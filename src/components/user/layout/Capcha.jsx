import {
    Alert,
    Button,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { LoginUser } from "../../../api/user";
import { message } from "antd";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function Capcha({ name, pass }) {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const randomString = Math.random().toString(36).slice(8);
    const [captcha, setCaptcha] = useState(randomString);
    const [text, setText] = useState("");
    const [valid, setValid] = useState(false);
    const [success, setSuccess] = useState(false);
    const closeButtonRef = useRef(null);
    const [load, setLoad] = useState(false)
    const navigate = useNavigate()

    const { login } = useAuth()


    const refreshString = () => {
        setText("");
        setCaptcha(Math.random().toString(36).slice(8));
    };

    const matchCaptcha = async (event) => {
        setLoad(true)
        event.preventDefault();
        if (text === captcha) {
            setValid(false);
            setSuccess(true);
            const dataUser = {
                email: name,
                password: pass
            }
            await LoginUser({ dataUser })
                .then(data => {
                    message.destroy()
                    message.success('Đăng nhập thành công')
                    if (closeButtonRef.current) {
                        closeButtonRef.current.click();
                    }
                    navigate('/')
                    setLoad(false)
                    login(data.userLogin)
                })
                .catch(err => {
                    message.error('Tài khoản hoặc mật khẩu không chính xác')
                    refreshString()
                    setSuccess(false)
                    setLoad(false)
                    if (closeButtonRef.current) {
                        closeButtonRef.current.click();
                    }
                })
            // await
        } else {
            setValid(true);
            setSuccess(false);
            setLoad(false)
        }
    };
    return (
        <React.Fragment>
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
            <>
                {/* Button trigger modal */}
                {/* Modal */}
                <button
                    type="button"
                    className="btn btn-primary w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                >
                    Đăng nhập
                </button>
                <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex={-1}
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    id="closebtn"
                                    ref={closeButtonRef}
                                />
                            </div>
                            <div className="modal-body">
                                <div className="">
                                    {success && (
                                        <Alert variant="outlined" sx={{ marginBottom: "20px" }}>
                                            Thành công
                                        </Alert>
                                    )}
                                    <CardContent className="cardcap">
                                        <CardActions>
                                            <div className="h3cap text-center">{captcha}</div>
                                            <Button
                                                startIcon={<RefreshIcon />}
                                                onClick={() => refreshString()}
                                            ></Button>
                                        </CardActions>

                                        <form >
                                            <TextField
                                                label="Nhập mã xác thực"
                                                focused
                                                value={text}
                                                fullWidth
                                                onChange={(e) => setText(e.target.value)}
                                                error={valid}
                                                helperText={valid && "Mã không hợp lệ"}
                                            />
                                            {load ?
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    type="button"
                                                    sx={{ marginTop: "20px" }}
                                                    onClick={matchCaptcha}
                                                >
                                                    <Spinner animation="border" style={{ height: '20px', width: '20px' }} role="status">
                                                    </Spinner>
                                                </Button>

                                                :
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    type="button"
                                                    sx={{ marginTop: "20px" }}
                                                    onClick={matchCaptcha}
                                                >
                                                    Xác nhận
                                                </Button>

                                            }

                                        </form>
                                    </CardContent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </React.Fragment>
    )
}

export default Capcha