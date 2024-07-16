import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/esm/Spinner';
import { message } from 'antd';
import { AddCustomerCate } from '../../../api/LoaiTK';
function AddLoaiTaiKhoanAd({ setData }) {
    const [img, setImg] = useState("")
    const [isUsed, setIsUsed] = useState(false)
    const [load, setLoad] = useState(false)
    // const { token } = useAuth()
    const [name, setName] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddUser = async (e) => {
        setLoad(true)
        const value = {
            customerCateName: name,
        }
        if (name === '') {
            message.destroy()
            message.error('Không được để trống trường thông tin')
            setLoad(false)
        }
        else {

            await AddCustomerCate({ datacate: value })
                .then((data) => {
                    message.success("Thêm thành công")
                    setName('')
                    setData(data)
                    setLoad(false)
                    setShow(false)
                })
                .catch(err => {
                    message.error(err.message)
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
                    <Modal.Title>Thêm loại tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label> Tên loại:</Form.Label>
                            <Form.Control
                                type="text"
                                min={1}
                                max={60}
                                autoFocus
                                value={name}
                                onChange={(e) => { setName(e.target.value.trimStart()); }}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please provide a name.
                            </Form.Control.Feedback>
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

export default AddLoaiTaiKhoanAd