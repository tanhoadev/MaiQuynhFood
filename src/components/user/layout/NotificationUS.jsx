import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/esm/Spinner';
import { message } from 'antd';
import PaginationNoti from '../../admin/Thongbao/PaginationNoti';
import { formatISODateTime } from '../../../format/price';
import { GetAllNoti } from '../../../api/Thongbao';
import Preview from './Preview';
function NotificationUS() {
    const [img, setImg] = useState("")
    const [isUsed, setIsUsed] = useState(false)
    const [load, setLoad] = useState(false)
    const [writeNotifi, setWriteNotify] = useState('')
    // const { token } = useAuth()
    const [title, setTitle] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([])
    const [stateData, setStateData] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(8)
    // const { token } = useAuth()
    useEffect(() => {
        setLoad(true)
        GetAllNoti()
            .then(data => {
                setData(data)
                setLoad(false)
                setStateData(true)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
                setLoad(false)
                setStateData(false)
            })
    }, [])

    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = data.slice(firstPostIndex, lastPostIndex)
    return (
        <>
            <Button className='d-flex justify-content-center position-relative align-items-center' variant="primary" onClick={handleShow}
                style={{ background: 'transparent', border: 'none', color: '#81c408', fontSize: '32px' }}
                onFocus={(e) => e.target.style.boxShadow = 'none'}>
                <i class="fa-solid fa-bell "></i>
                <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: "0px", left: 28, height: 20, minWidth: 20, fontSize: '16px' }}
                >
                    !
                </span>

            </Button>

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Thông Báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        load ?
                            <div className='container'>
                                <div className="row justify-content-center">
                                    <Spinner animation="border" role="status">
                                    </Spinner>
                                </div>
                            </div>
                            :
                            stateData ?
                                <>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Tiêu đề</th>
                                                <th>Thời gian</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                currentPosts.length > 0 && currentPosts.map((item, index) => (
                                                    <tr>
                                                        <td>
                                                            {item.title}
                                                        </td>
                                                        <th>{formatISODateTime(`${item.notificationTime}`)}</th>
                                                        <th>
                                                            <td className='d-flex gap-2'>
                                                                <Preview
                                                                    currentPage={currentPage}
                                                                    id={item.id}
                                                                    title1={item.title}
                                                                    writeNoti1={item.contentValue}
                                                                    setData={setData}
                                                                />
                                                            </td>
                                                        </th>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                    <div className='' style={{ marginLeft: '15px', marginTop: '-6px' }}>
                                        <PaginationNoti
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            totalPosts={data.length}
                                            PostsPerPage={postsPerPage} />
                                    </div>
                                </>
                                : <span className='text-center text-danger'>An error occurred while transferring data.</span>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default NotificationUS