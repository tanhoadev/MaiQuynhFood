import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { GetALLProduct } from '../../../api/Sanpham'
import { AddCart, GetALLCart } from '../../../api/cart'
import { message } from 'antd'
import { formatCurrency } from '../../../format/price'
import PaginationShop from './PaginationShop'
import { Link, useLocation } from 'react-router-dom'

function FruitsShop() {
    const [data, setData] = useState([])
    const [dataCop, setDataCop] = useState([])
    const [datacateTop, setDatacateTop] = useState([])
    const { userData, setNumCart } = useAuth()
    const [stateData, setStateData] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(9)
    const [word, setWord] = useState('')
    const [sortt, setSortt] = useState(1)
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
    const name = query.get('name');


    const handleChanleFind = (e) => {
        setWord(e.target.value)
        if (e.target.value === '') {
            setData(dataCop)
        }
        else {
            const filter = dataCop.filter(x => x.productName.toLowerCase().includes(e.target.value.toLowerCase()));
            setData(filter)
        }
    }

    const Findproduct = (valuename) => {
        setWord(valuename)
        if (valuename === '') {
            setData(dataCop)
        }
        else {
            const filter = dataCop.filter(x => x.productName.toLowerCase().includes(valuename.toLowerCase()));
            setData(filter)
        }
    }
    const handleSort = (e) => {
        setSortt(e.target.value)
        if (parseInt(e.target.value) === 1) {
            const sortedData = dataCop.sort((a, b) => a.productName.toLowerCase().localeCompare(b.productName.toLowerCase()));
            setData(sortedData)
        }
        if (parseInt(e.target.value) === 2) {
            const sortedData = dataCop.sort((a, b) => b.productName.toLowerCase().localeCompare(a.productName.toLowerCase()));
            setData(sortedData)
        }
        if (parseInt(e.target.value) === 3) {
            const sortedData = dataCop.sort((a, b) => a.price - b.price);
            setData(sortedData)
        }
        if (parseInt(e.target.value) === 4) {
            const sortedData = dataCop.sort((a, b) => b.price - a.price);
            setData(sortedData)
        }
    }
    useEffect(() => {
        window.scroll(0, 0)
    }, [currentPage])
    useEffect(() => {
        GetALLProduct()
            .then(data => {
                setWord(name)
                if (name === '' || name === null) {
                    setData(data)
                }
                else {
                    const filter = data.filter(x => x.productName.toLowerCase().includes(name.toLowerCase()));
                    setData(filter)
                }
                setDataCop(data)
                setStateData(true)

                // Sử dụng Map để lưu các cặp categoryId và đối tượng { categoryName, quantity }
                const categoryMap = new Map();

                // Duyệt qua data và thêm các cặp categoryId và đối tượng { categoryName, quantity } vào Map
                data.forEach(product => {
                    if (!categoryMap.has(product.categoryId)) {
                        categoryMap.set(product.categoryId, { categoryName: product.categoryName, quantity: 1 });
                    } else {
                        const category = categoryMap.get(product.categoryId);
                        category.quantity += 1;
                        categoryMap.set(product.categoryId, category);
                    }
                });

                // Chuyển Map thành mảng các đối tượng { categoryId, categoryName, quantity }
                const uniqueCategories = Array.from(categoryMap, ([categoryId, { categoryName, quantity }]) => ({
                    categoryId,
                    categoryName,
                    quantity
                }));

                // Lưu các giá trị duy nhất vào biến uniqueCategories
                setDatacateTop(uniqueCategories);
            })
            .catch(err => {
                setStateData(false)
                console.log(err)
            })

    }, [])
    const hanleAddToCart = async ({ id, productName, productUnit, productImage }) => {
        const dataCart =
        {
            "productID": id,
            "productName": productName,
            "quantity": 1,
            "productUnit": productUnit,
            "productImage": productImage
        }
        await AddCart({ id: userData.id, dataCart, token: userData.token })
            .then(data => {
                message.destroy()
                message.success('Thêm thành công')
                GetALLCart({ id: userData.id, token: userData.token })
                    .then(data => setNumCart(data.length))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = data.slice(firstPostIndex, lastPostIndex)
    return (
        <>
            {/* Fruits Shop Start*/}
            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <div className="row g-4">
                        <div className="col-lg-12">
                            <div className="row g-4">
                                <div className="col-xl-3">
                                    <div className="input-group w-100 mx-auto d-flex" style={{ zIndex: 1 }}>
                                        <input
                                            type="search"
                                            className="form-control p-3"
                                            placeholder="Tìm kiếm"
                                            aria-describedby="search-icon-1"
                                            value={word}
                                            onChange={handleChanleFind}
                                        />
                                        <span id="search-icon-1" className="input-group-text p-3">
                                            <i className="fa fa-search" />
                                        </span>
                                    </div>
                                </div>
                                <div className="col-6" />
                                <div className="col-xl-3">
                                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                        <label htmlFor="fruits">Sắp xếp theo:</label>
                                        <select
                                            id="fruits"
                                            name="fruitlist"
                                            className="border-0 form-select-sm bg-light me-3"
                                            form="fruitform"
                                            onChange={handleSort}
                                        >
                                            <option value={1}>Tên: A - Z</option>
                                            <option value={2}>Tên: Z - A</option>
                                            <option value={3}>Giá: Thấp - Cao</option>
                                            <option value={4}>Giá: Cao - Thấp</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-lg-3">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4>Danh mục</h4>
                                                <ul className="list-unstyled fruite-categorie">
                                                    {datacateTop && datacateTop.map((item, index) =>
                                                        <li>
                                                            <div className="d-flex justify-content-between fruite-name">
                                                                <button style={{ width: '100%', color: '#81c408', textDecoration: 'none', textAlign: 'left', border: 'none', background: 'transparent', 'padding': '0' }}
                                                                    onClick={() => { setData(dataCop.filter(x => x.categoryId === item.categoryId)) }}
                                                                >
                                                                    <span>
                                                                        <i className="fas fa-apple-alt me-2" />
                                                                        {item.categoryName}
                                                                    </span>
                                                                </button>
                                                                <span>({item.quantity})</span>
                                                            </div>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="position-relative">
                                                <img
                                                    src="img/banner-fruits.jpg"
                                                    className="img-fluid w-100 rounded"
                                                    alt=""
                                                />
                                                <div
                                                    className="position-absolute"
                                                    style={{
                                                        top: "50%",
                                                        right: 10,
                                                        transform: "translateY(-50%)"
                                                    }}
                                                >
                                                    <h3 className="text-secondary fw-bold">
                                                        Fresh <br /> Fruits <br /> Banner
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="row g-4 justify-content-center">
                                        {
                                            currentPosts.length === 0 ?
                                                <img style={{ margin: '0' }} src="https://cdn.dribbble.com/users/721524/screenshots/4117132/media/6dff4135f851cd4af82839d83e00d1d6.png?resize=800x600&vertical=center" alt="" />
                                                :
                                                <>
                                                    {
                                                        currentPosts.length > 0 && currentPosts.map((item, index) =>
                                                            <div className="col-md-6 col-lg-6 col-xl-4">
                                                                <div className="rounded position-relative fruite-item">
                                                                    <Link to={`/chitiet?id=${item.id}`}>
                                                                        <div className="fruite-img">
                                                                            <img
                                                                                src={item.image}
                                                                                className="img-fluid w-100 rounded-top"
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                        <div
                                                                            className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                                                                            style={{ top: 10, left: 10 }}
                                                                        >
                                                                            {item.categoryName}
                                                                        </div>
                                                                    </Link>
                                                                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                                        <h4 style={{
                                                                            height: '57px',
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis',
                                                                            display: '-webkit-box',
                                                                            WebkitLineClamp: 2,
                                                                            WebkitBoxOrient: 'vertical'
                                                                        }}>
                                                                            {item.productName}
                                                                        </h4>
                                                                        <div className="d-flex justify-content-between flex-lg-wrap">
                                                                            <p className="text-dark fs-5 fw-bold mb-0">
                                                                                {formatCurrency(`${item.price}đ`)} / {item.unit}
                                                                            </p>
                                                                            <button
                                                                                onClick={() => { hanleAddToCart({ id: item.id, productName: item.productName, productUnit: item.unit, productImage: item.image }) }}
                                                                                className="btn border border-secondary rounded-pill px-3 text-primary"
                                                                            >
                                                                                <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                                                                                Giỏ hàng
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>)
                                                    }
                                                </>
                                        }
                                        <PaginationShop
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            totalPosts={data.length}
                                            PostsPerPage={postsPerPage}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Fruits Shop End*/}
        </>

    )
}

export default FruitsShop