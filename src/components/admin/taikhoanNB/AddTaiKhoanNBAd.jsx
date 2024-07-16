import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/esm/Spinner';
import { message } from 'antd';
import { AddEmployee, AddEmployeeeeee } from '../../../api/user';

function AddTaiKhoanNBAd({ setData }) {
    const [img, setImg] = useState("")
    const [isUsed, setIsUsed] = useState(false)
    const [load, setLoad] = useState(false)
    // const { token } = useAuth()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()
    const [cate, setCate] = useState(1)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAddUser = async () => {
        if (name !== undefined && email !== undefined && pass !== undefined) {
            setLoad(true)
            const dataem = {
                username: name,
                password: pass,
                email: email
            }
            if (cate === 1) {
                await AddEmployee({ dataem })
                    .then((data) => {
                        message.success("Thêm thành công")
                        setData(data)
                        setLoad(false)
                        setShow(false)
                    })
                    .catch(err => {
                        if (err.response) {
                            message.destroy()
                            message.error(err.response.data.message)
                        }
                        else {
                            message.error(err.message)
                        }
                        console.log(err)
                        setLoad(false)
                    })
            }
            else {
                await AddEmployeeeeee({ dataem })
                    .then((data) => {
                        message.success("Thêm thành công")
                        setData(data)
                        setLoad(false)
                        setShow(false)
                    })
                    .catch(err => {
                        if (err.response) {
                            message.destroy()
                            message.error(err.response.data.message)
                        }
                        else {
                            message.error(err.message)
                        }
                        console.log(err)
                        setLoad(false)
                    })
            }
        }
        else {
            message.error("vui lòng nhập đầy đủ các trường")
        }
    }
    const handleChangeImage = (e) => {
        if (e.target.files[0]) {
            setLoad(true)
            setImg(e.target.files[0])
            const showImg = document.querySelector('#img-showback')
            showImg.src = URL.createObjectURL(e.target.files[0])

            const data = new FormData()
            data.append("file", e.target.files[0])
            data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET)
            data.append("cloudName", process.env.REACT_APP_CLOUDNAME)
            fetch(process.env.REACT_APP_API_CLOUDINARY, {
                method: "post",
                body: data
            })
                .then((res) => res.json())
                .then((data) => {
                    setImg(data.url.toString())
                    setLoad(false)
                })
                .catch((err) => {
                    console.log(err)
                    setLoad(false)
                })
        }
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label> Tên tài khoản:</Form.Label>
                            <Form.Control
                                type="text"
                                min={1}
                                max={60}
                                autoFocus
                                value={name}
                                onChange={(e) => { setName(e.target.value.trimStart()); }}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email: </Form.Label>
                            <Form.Control
                                type="email"
                                min={1}
                                max={60}
                                autoFocus
                                value={email}
                                onChange={(e) => { setEmail(e.target.value.trimStart()); }}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label> Mật khẩu:</Form.Label>
                            <Form.Control
                                type="password"
                                min={1}
                                max={60}
                                autoFocus
                                value={pass}
                                onChange={(e) => { setPass(e.target.value.trimStart()); }}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Select aria-label="Default select example" onChange={(e) => setCate(e.target.value)} value={cate}>
                                <option value={1}>Quản trị viên</option>
                                <option value={2}>Nhân viên</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    {
                        load ?
                            <Button variant="primary" disabled>
                                <Spinner animation="border" style={{ height: '20px', width: '20px' }} role="status">
                                </Spinner>
                            </Button>
                            :
                            <Button variant="primary" type='submit' onClick={handleAddUser}>
                                Add
                            </Button>

                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddTaiKhoanNBAd