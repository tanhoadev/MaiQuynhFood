import React, { useState } from 'react'
import { GetAllInvoiceDetail } from '../../../api/checkout'
import { formatCurrency, formatISODateTime } from '../../../format/price';

function StartLichsu({ email, phone, name, province, district, ward, houseNum, id, time, status, sum, total }) {
  const [show, setShow] = useState(true)
  const [data, setData] = useState([])
  // Chuỗi thời gian ISO 8601
  const handleClick = () => {
    GetAllInvoiceDetail({ id })
      .then(data => {
        console.log(data)
        setData(data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <>
      <div className="container-fluid" style={{ marginTop: '20px' }}>
        <div className="card shadow-0 border mb-4">
          {/* {data.map((itemHoadon, indexHoadon) => ( */}
          <div key={1} className="card-body bb">
            <div className="row px-xl-5 gap-12-0">
              <div className="col-md-3 col-lg-3 text-center d-flex justify-content-center align-items-center">
                {/* <p className="text-muted mb-0">Thời gian đặt: {itemHoadon.NgayThanhToan}</p> */}
                <p className="text-muted mb-0">Thời gian đặt: {formatISODateTime(`${time}`)}</p>
              </div>
              <div className="col-md-2 col-lg-2 text-center d-flex justify-content-center align-items-center">
                {status === 'Đang xử lý' && (
                  <div className="alert alert-warning" role="alert">
                    {status}
                  </div>
                )}
                {status === 'Đang giao hàng' && (
                  <div className="alert alert-info" role="alert">
                    {status}
                  </div>
                )}
                {status === 'Đã giao hàng' && (
                  <div className="alert alert-success mb-0" role="alert">
                    {status}
                  </div>
                )}
              </div>
              <div className="col-md-3 col-lg-3 text-center d-flex justify-content-center align-items-center">
                <p className="text-muted mb-0">Tổng số lượng: {sum}</p>
                {/* <p className="text-muted mb-0">Tổng số lượng: {itemHoadon.sumTotal}</p> */}
              </div>
              <div className="col-md-2 col-lg-2 text-center d-flex justify-content-center align-items-center">
                {/* <p className="text-muted mb-0">Tổng tiền: {itemHoadon.Gia}</p> */}
                <p className="text-muted mb-0">Tổng tiền:  {formatCurrency(`${total}đ`)}</p>
              </div>
              <div className="col-md-2 col-lg-2 text-center d-flex justify-content-center align-items-center">
                {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#Modal`}>
                  <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#Modal${indexHoadon}`}>
                  Xem chi tiết
                </button> */}
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target={`#exampleModal${id}`}
                  onClick={handleClick}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>
      <>
        {/* Modal */}
        <div
          className="modal fade"
          id={`exampleModal${id}`}
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content Modal1" style={{ borderRadius: '13px' }}>
              <div className="modal-header justify-content-end">
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body p-0">
                <div className="card m-0" style={{ borderRadius: '10px' }}>
                  <div className="card-body p-4">
                    <div className="invoice-title">
                      <div className="d-flex justify-content-between">
                        <div className="mb-4">
                          <h2 className="mb-1 text-muted">Mai Quỳnh</h2>
                        </div>
                        <h4 className="font-size-15">Hóa đơn # {id}</h4>
                        {/* <h4 className="font-size-15">Hóa đơn #{itemHoadon.Id}</h4> */}
                      </div>
                      <div className="text-muted">
                        <p className="mb-1">258 Đường Phù Đổng Thiên Vương, Phường 8, TP Đà Lạt</p>
                        <p className="mb-1"><i className="uil uil-envelope-alt me-1"></i>dacsanmaiquynhdalat@gmail.com</p>
                        <p><i className="uil uil-phone me-1"></i>0931-181-414</p>
                      </div>
                    </div>
                    <hr className="my-4" />

                    <div className="row">
                      <div className="col-sm-6">
                        <div className="text-muted">
                          <h5 className="font-size-16 mb-3">Thông tin người nhận: </h5>
                          <h5 className="font-size-15 mb-2">{name}</h5>
                          <p className="mb-1">{province}, {district}, {ward}, {houseNum}</p>
                          <p className="mb-1">{email}</p>
                          <p>{phone}</p>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="text-muted text-sm-end tx-align">
                          <div>
                            <h5 className="font-size-15 mb-1">Số hóa đơn : <span>{id}</span></h5>
                            <p></p>
                          </div>
                          <div className="mt-4">
                            <h5 className="font-size-15 mb-1">Ngày lập hóa đơn : {formatISODateTime(`${time}`)}</h5>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="font-size-15 mb-2">Thông tin đơn hàng</h5>
                    </div>
                    {/* {itemHoadon.hoadonList.map((item, index) => ( */}
                    <div className="card shadow-0 border mb-4">
                      {/* <div key={index} className="card shadow-0 border mb-4"> */}
                      <div className="card-body">
                        {data && data.map((item, index) => (
                          <div className="row gap-6-0 mt-2">
                            <div className="col-md-2">
                              <img src={item.productImage} className="img-fluid" alt="Phone" />
                            </div>
                            <div className="col-md-4 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0">{item.productName}</p>
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0 white-space">Loại: s kg</p>
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0 white-space">Số lượng: {item.quan}</p>
                            </div>
                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0 ">{formatCurrency(`${item.price}đ`)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* ))} */}

                  </div>
                  <div className="card-footer border-top-solid border-0 px-4 py-5 bg-primary" style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                    <h5 className="d-flex align-items-center justify-content-end text-white mb-0">Số tiền đã thanh toán: <span className="h2 mb-0 ms-2 ml-12 text-white">{formatCurrency(`${total}đ`)}</span></h5>
                  </div>
                  <div className="d-print-none mt-4">
                    <div className="float-end">
                      {/* <button onClick={() => printModalContent(`#Modal${indexHoadon}`)} className="btn btn-success me-1"><i className="fa fa-print"></i></button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

    </>
  )
}

export default StartLichsu