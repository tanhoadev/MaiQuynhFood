import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'


import { Line } from 'react-chartjs-2'
import { GetAllInvoice } from '../../../api/checkout';
import { formatCurrency } from '../../../format/price';
import { GetALLUser } from '../../../api/user';

ChartJS.register(
    LineElement,
    PointElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);
function MainHomeAddd() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const [year, setYear] = useState(currentYear);
    const [sum, setSum] = useState(0)
    const [countInvoice, setCountInvoice] = useState(0)
    const [countWait, setCountWait] = useState(0)
    const [datasets, setDatasets] = useState([]);
    const [countUser, setCountUser] = useState(0)
    const getRandomColor = () => {
        // Function to generate random hex color
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };
    useEffect(() => {
        GetALLUser()
            .then((data) => {
                setCountUser(data.length)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        GetAllInvoice()
            .then((data) => {
                setCountInvoice(data.length)
                const datawait = data.filter(x => x.status === 'Đang xử lý')
                setCountWait(datawait.length)
                // Sử dụng reduce để tính tổng của trường totalCost
                const totalCostSum = data.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.totalCost;
                }, 0);
                setSum(totalCostSum)
                // Initialize data structure to hold totals for each year
                const yearlyData = {
                    [currentYear - 2]: Array(12).fill(0), // Array to store totals for each month, initialized to 0
                    [currentYear - 1]: Array(12).fill(0),
                    [currentYear]: Array(12).fill(0)
                };
                // Calculate totals for each month and year
                data.forEach(item => {
                    const orderDate = new Date(item.orderDate);
                    const year = orderDate.getFullYear();
                    const month = orderDate.getMonth();

                    if (yearlyData[year]) {
                        yearlyData[year][month] += item.totalCost;
                    }
                });
                // Convert yearlyData into datasets format for Chart.js
                const newDatasets = Object.keys(yearlyData).map(year => ({
                    label: `${year}`,
                    data: yearlyData[year],
                    backgroundColor: getRandomColor(), // Helper function to generate random color
                    borderColor: 'black',
                    borderWidth: 1
                }));

                setDatasets(newDatasets);
            })
            .catch(err => {
                // setLoad(false)
                console.log(err)
            })
    }, [])
    const [labels, setLabels] = useState([
        `1/${currentYear}`,
        `2/${currentYear}`,
        `3/${currentYear}`,
        `4/${currentYear}`,
        `5/${currentYear}`,
        `6/${currentYear}`,
        `7/${currentYear}`,
        `8/${currentYear}`,
        `9/${currentYear}`,
        `10/${currentYear}`,
        `11/${currentYear}`,
        `12/${currentYear}`,
    ]);
    const dataBarChart = {
        labels: ['tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6', 'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'],
        // datasets: [
        //     {
        //         label: `${currentYear - 2}`,
        //         data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        //         backgroundColor: '#f6cd61',
        //         borderColor: 'black',
        //         borderWidth: 1
        //     },
        //     {
        //         label: `${currentYear - 1}`,
        //         data: [15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125],
        //         backgroundColor: '#0e9aa7',
        //         borderColor: 'black',
        //         borderWidth: 1
        //     },
        //     {
        //         label: `${currentYear}`,
        //         data: [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130],
        //         backgroundColor: '#fe9c8f',
        //         borderColor: 'black',
        //         borderWidth: 1
        //     },
        // ]
        datasets: datasets
    }
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <>
            {/* <Line data={data} options={options}></Line> */}
            <div className="row">
                <div className="col-lg-3">
                    <div className="card">
                        <div className="stat-widget-one d-flex align-items-center ">
                            <div className="stat-icon dib">
                                <i className="ti-money color-success border-success" />
                                {/* <i class="fa-solid fa-money-bill "></i> */}
                                <i class="fa-solid fa-dollar-sign icon-test text-success"></i>
                            </div>
                            <div className="stat-content dib" style={{ marginLeft: '22px' }}>
                                <div className="stat-text">Tổng thu</div>
                                <div className="stat-digit">{sum && formatCurrency(`${sum}đ`)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="card">
                        <div className="stat-widget-one d-flex align-items-center ">
                            <div className="stat-icon dib">
                                <i className="ti-user color-primary border-primary" />
                                <i class="fa-solid fa-user icon-test text-primary"></i>
                            </div>
                            <div className="stat-content dib" style={{ marginLeft: '22px' }}>
                                <div className="stat-text">Người dùng</div>
                                <div className="stat-digit">
                                    {countUser}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="card">
                        <div className="stat-widget-one d-flex align-items-center ">
                            <div className="stat-icon dib">
                                {/* <i className="ti-shopping-cart color-pink border-pink" /> */}
                                <i class="fa-solid fa-cart-shopping icon-test text-info"></i>
                            </div>
                            <div className="stat-content dib" style={{ marginLeft: '22px' }}>
                                <div className="stat-text">Đơn hàng</div>
                                <div className="stat-digit" >
                                    {countInvoice}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="card">
                        <div className="stat-widget-one d-flex align-items-center ">
                            <div className="stat-icon dib ">
                                <i className="ti-notepad color-danger border-danger" />
                                <i class="fa-solid fa-clipboard icon-test text-danger"></i>
                            </div>
                            <div className="stat-content dib" style={{ marginLeft: '22px' }}>
                                <div className="stat-text" >Chờ duyệt</div>
                                <div className="stat-digit">{countWait}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-title">
                            <h4>Doanh thu</h4>
                        </div>
                        <div class="card-body">
                            <div class="ct-bar-chart m-t-30 d-flex justify-content-center" style={{ height: '545px' }}>
                                {/* <Line data={data} options={options} />; */}
                                <Bar data={dataBarChart} options={options} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainHomeAddd