import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { message } from 'antd';
import { DeleteCom } from '../../../api/binhluan';
import swal from 'sweetalert';

function DeleteComment({ idproduct, id, token, setData }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = async () => {
        await DeleteCom({ id, token, idproduct })
            .then(data => {
                setData(data)
                message.destroy()
                swal({
                    title: "Thành công!",
                    text: "Đã xóa bình luận",
                    icon: "success",
                });
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
        <div className='' style={{ marginLeft: '18px' }}>
            <Button variant="primary" className='btn btn-warning' onClick={handleShow}>
                <i className="fa-solid fa-trash " />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body className='alert-danger m-2'>Bạn có chắc chắn muốn xóa bình luận này không ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" className='btn-danger' onClick={handleDelete}>
                        Đồng Ý
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DeleteComment