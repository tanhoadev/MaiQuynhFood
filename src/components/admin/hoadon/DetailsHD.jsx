import React from 'react'

function DetailsHD(props) {

    return (
        <div
            className="modal fade"
            id={`ModalCate${props.id}`}
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Chi tiết đặt hàng #{props.id}
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="p-3">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Hình</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.data.map((item, index) => (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.productName}</td>
                                            <img src={item.productImage} style={{ maxHeight: '120px', borderRadius: '12px' }} alt={item.ten} />
                                            <td>{item.quan}</td>
                                            <td>{item.price}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsHD