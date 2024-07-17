import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { message } from 'antd';
import { DeleteEmployee } from '../../../api/user';

function DeleteTKNB({ id, setData }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = async () => {
        await DeleteEmployee({ id })
            .then(data => {
                setData(data)
                message.destroy()
                message.success('Xóa thành công')
                handleClose()
            })
            .catch(err => {
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
                <Modal.Body className='alert-danger m-2'>Bạn có chắc chắn muốn xóa Tài khoản này không ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" className='btn-danger' onClick={handleDelete}>
                        Đồng Ý
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteTKNB