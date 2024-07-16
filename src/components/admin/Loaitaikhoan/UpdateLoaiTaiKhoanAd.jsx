import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/esm/Spinner';
// import { useAuth } from '../../contexts/AuthContext';
// import { UpdateBackCardDetail } from '../../../api/backCard';
import { message } from 'antd';
import { UpdateCustomerCate } from '../../../api/LoaiTK';

function UpdateLoaiTaiKhoanAd({ name1, setData, currentPage, id }) {
    const [img, setImg] = useState("")
    // const { token } = useAuth()
    const [load, setLoad] = useState(false)
    const [name, setName] = useState(name1)

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        setName(name1)
    };
    const handleShow = () => setShow(true);
    const handleUpdateBackCard = async () => {
        const datacate = {
            customerCateName: name,
        }
        if (name === '') {
            message.destroy()
            message.error('Không được để trống trường thông tin')
            setLoad(false)
        }
        else {
            UpdateCustomerCate({ id, datacate })
                .then(data => {
                    setData(data)
                    message.success('Cập nhật thành công')
                    handleClose()
                })
                .catch(error => {
                    if (error.response) {
                        message.error(error.response.data.message)
                    }
                    else {
                        message.error(error.message)
                    }
                })
        }
    }
    useEffect(() => {
        // setIsUsedUp(isUsed)
        // setImg(src)
        setName(name1)
    }, [currentPage])
    return (
        <>
            <Button id={`upadate${id}`} variant="primary" onClick={handleShow}>
                <i class="fa-solid fa-pen"></i>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật loại Tài khoản</Modal.Title>
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
                        Hủy
                    </Button>
                    {
                        load ?
                            <Button variant="primary" disabled>
                                <Spinner animation="border" style={{ height: '20px', width: '20px' }} role="status">
                                </Spinner>
                            </Button>
                            :
                            <Button variant="primary" type='submit' onClick={handleUpdateBackCard}>
                                Cập nhật
                            </Button>

                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpdateLoaiTaiKhoanAd