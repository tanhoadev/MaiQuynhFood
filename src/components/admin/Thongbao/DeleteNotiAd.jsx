import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { message } from 'antd';
import { DeleteNoti } from '../../../api/Thongbao';
import { Spinner } from 'react-bootstrap';
import swal from 'sweetalert';
function DeleteNotiAd({ id, setData }) {
    const [show, setShow] = useState(false);
    const [load, setLoad] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = async () => {
        setLoad(true)
        await DeleteNoti({ id })
            .then(data => {
                setData(data)
                message.destroy()
                swal({
                    title: "Thành công!",
                    text: "Thông báo đã xóa thành công!",
                    icon: "success",
                });
                handleClose()
                setLoad(false)
            })
            .catch(err => {
                setLoad(false)
                console.log(err)
                if (err.response) {
                    message.error(err.response.data.message)
                }
                else {
                    message.error(err.message)
                }
            })

    }
    return (
        <>
            <Button variant="primary" className='btn btn-warning' onClick={handleShow}>
                <i className="fa-solid fa-trash " />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body className='alert-danger m-2'>Bạn có chắc chắn muốn xóa thông báo này không ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    {load ? <Button variant="primary" className='btn-danger' disabled>
                        <Spinner animation="border" style={{ height: '20px', width: '20px' }} role="status">
                        </Spinner>
                    </Button>
                        :
                        <Button variant="primary" className='btn-danger' onClick={handleDelete}>
                            Đồng Ý
                        </Button>
                    }

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteNotiAd