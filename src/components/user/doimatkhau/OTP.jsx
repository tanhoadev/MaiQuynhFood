import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { message } from 'antd';
import { Spinner } from 'react-bootstrap'
import { UpdatePassUsserOK } from '../../../api/user';


function OTP({ name, pass, setShow }) {
  const { userData } = useAuth()
  const [email, setEmail] = useState()
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [load, setLoad] = useState(false)

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus on next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };


  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (e.target.previousSibling && otp[index] === "") {
        e.target.previousSibling.focus();
      }
    }
  };
  const handleCheck = () => {
    if (otp.some(value => value === "")) {
      message.destroy()
      message.error('Vui lòng nhập đủ OTP')
    }
    else {
      setLoad(true)
      const otpString = otp.join("");
      const userDatas = {
        "userName": name,
        "newPass": pass,
        "otp": otpString
      }
      UpdatePassUsserOK({ userDatas })
        .then(data => {
          message.success('Cập nhật mật khẩu thành công')
          setLoad(false)
          setShow(false)
        })
        .catch(err => {
          if (err.response) {
            message.error(err.response.data.mess)
            setLoad(false)
          }
          else {
            message.error('Lỗi hệ thống')
            setLoad(false)
          }
        })
    }
  }
  useEffect(() => {
    if (userData) {
      setEmail(userData.email.slice(0, 4))
    }
  }, [userData])

  return (
    <>
      <style>
        {`
          .height-100 {
            height: 100vh;
          }

          .cardOTP {
            width: 400px;
            border: none;
            height: 300px;
            z-index: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .cardOTP h6 {
            color: red;
            font-size: 20px;
          }

          .inputsOTP input {
            width: 40px;
            height: 40px;
          }

          input[type=number]::-webkit-inner-spin-button,
          input[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            margin: 0;
          }

          .card-2OTP {
            background-color: #fff;
            padding: 10px;
            width: 350px;
            height: 100px;
            bottom: -50px;
            left: 20px;
            position: absolute;
            border-radius: 5px;
          }

          .card-2OTP .contentOTP {
            margin-top: 50px;
          }

          .card-2OTP .contentOTP a {
            color: red;
          }

          .form-controlOTP:focus {
            box-shadow: none;
            border: 2px solid red;
          }

          .validateOTP {
            border-radius: 20px;
            height: 40px;
            background-color: red;
            border: 1px solid red;
            width: 140px;
          }
        `}
      </style>
      <div className="container d-flex justify-content-center align-items-center " style={{ border: 'none' }}>
        <div className="position-relative">
          <div className="card cardOTP p-2 text-center" style={{ boxShadow: 'none' }}>
            <h6>
              Vui lòng nhập mã xác thực<br /> để xác minh tài khoản của bạn.
            </h6>
            <div>
              {" "}
              <span>Mã đã được gửi đến email</span> <small>{email && email}***@gmail.com</small>{" "}
            </div>
            <div id="otp" className="inputsOTP d-flex flex-row justify-content-center mt-2">
              {otp.map((data, index) => {
                return (
                  <input
                    className="m-2 text-center form-control form-controlOTP rounded"
                    type="number"
                    name="otp"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    onFocus={e => e.target.select()}
                  />
                );
              })}
            </div>
            <div className="mt-4">
              {" "}
              {load ?
                <>
                  <button className="btn btn-danger px-4 validateOTP" disabled>
                    <Spinner animation="border" style={{ height: '20px', width: '20px' }} role="status">
                    </Spinner>
                  </button>{" "}
                </>
                :
                <button className="btn btn-danger px-4 validateOTP" onClick={handleCheck}>Xác thực</button>
              }

            </div>
          </div>
        </div>
      </div>

    </>

  )
}

export default OTP