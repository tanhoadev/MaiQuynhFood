import FacebookMsg from './components/FacebookMsg';
import Example from './components/NewE';
import BackCardHomeAd from './components/admin/BackCard/BackCardHomeAd';
import LoaiTaiKhoanAd from './components/admin/Loaitaikhoan/LoaiTaiKhoanAd';
import ThongbaoHomeAd from './components/admin/Thongbao/ThongbaoHomeAd';
import UserHomeAd from './components/admin/User/UserHomeAd';
import HoaDonHomeAd from './components/admin/hoadon/HoaDonHomeAd';
import LayoutAdmin from './components/admin/layout/LayoutAdmin';
import LoaiSanPhamAd from './components/admin/loaisanpham/LoaiSanPhamAd';
import SanPhamHomeAd from './components/admin/sanpham/SanPhamHomeAd';
import TaiKhoanNoiBoHomeAd from './components/admin/taikhoanNB/TaiKhoanNoiBoHomeAd';
import TaiKhoanKhachHomeAd from './components/admin/taikhoankh/TaiKhoanKhachHomeAd';
import Main404 from './components/user/404/Main404';
import Example1 from './components/user/auth/Test';
import MainCart from './components/user/cart/MainCart';
import Maincheckout from './components/user/checkout/Maincheckout';
import MainDetail from './components/user/detail/MainDetail';
import MainGioiThieu from './components/user/gioithieu/MainGioiThieu';
import HomeBanner from './components/user/home/HomeBanner';
import MainHome from './components/user/home/MainHome';
import Banner from './components/user/layout/Banner';
import LayoutUser from './components/user/layout/LayoutUser';
import MainLienHe from './components/user/lienhe/MainLienHe';
import FruitsShop from './components/user/shop/FruitsShop';
import MainShop from './components/user/shop/MainShop';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutUser />} >
          <Route index element={<MainHome />} />
          <Route path='gioithieu' element={<MainGioiThieu />} />
          <Route path='lienhe' element={<MainLienHe />} />
          <Route path='chitiet' element={<MainDetail />} />
          <Route path='giohang' element={<MainCart />} />
          <Route path='thanhtoan' element={<Maincheckout />} />
          <Route path='cuahang' element={<MainShop />} />
          <Route path='cc' element = {<Example1/>} />
          <Route path="*" element={<Main404 />} />
        </Route>

        <Route path='/admin' element={<LayoutAdmin />}>
          {/* <Route index element={isAdminAuthenticated ? <LayoutAdmin />: <NotFound/>} /> */}
          {/* <Route index element={ ? <UserHomeAd /> : <NotFound />} /> */}

          <Route path='loaisanpham' index element ={<LoaiSanPhamAd/>} />
          <Route path='hoadon' index element ={<HoaDonHomeAd/>} />
          <Route path='loaitaikhoan' index element ={<LoaiTaiKhoanAd/>} />
          <Route path='sanpham' index element ={<SanPhamHomeAd/>} />
          <Route path='khachhang' index element ={<TaiKhoanKhachHomeAd/>} />
          <Route path='noibo' index element ={<TaiKhoanNoiBoHomeAd/>} />
          <Route path='thongbao' index element ={<ThongbaoHomeAd/>} />
          <Route path='test' index element ={<BackCardHomeAd/>} />
        </Route>

        {/* <div className="App">
          <Example />
          <FacebookMsg />
        </div> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
