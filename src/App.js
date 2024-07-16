import FacebookMsg from './components/FacebookMsg';
import Example from './components/NewE';
import BackCardHomeAd from './components/admin/BackCard/BackCardHomeAd';
import LoaiTaiKhoanAd from './components/admin/Loaitaikhoan/LoaiTaiKhoanAd';
import ThongbaoHomeAd from './components/admin/Thongbao/ThongbaoHomeAd';
import UserHomeAd from './components/admin/User/UserHomeAd';
import MainLogin from './components/admin/adlogin/MainLogin';
import HoaDonHomeAd from './components/admin/hoadon/HoaDonHomeAd';
import MainHomeAddd from './components/admin/home/MainHomeAddd';
import LayoutAdmin from './components/admin/layout/LayoutAdmin';
import LoaiSanPhamAd from './components/admin/loaisanpham/LoaiSanPhamAd';
import SanPhamHomeAd from './components/admin/sanpham/SanPhamHomeAd';
import TaiKhoanNoiBoHomeAd from './components/admin/taikhoanNB/TaiKhoanNoiBoHomeAd';
import TaiKhoanKhachHomeAd from './components/admin/taikhoankh/TaiKhoanKhachHomeAd';
import Main404 from './components/user/404/Main404';
import Example1 from './components/user/auth/Test';
import MainCart from './components/user/cart/MainCart';
import Maincheckout from './components/user/checkout/Maincheckout';
import MainDangKi from './components/user/dangki/MainDangKi';
import MainDangNhap from './components/user/dangnhap/MainDangNhap';
import MainDetail from './components/user/detail/MainDetail';
import MainDoiMatKhau from './components/user/doimatkhau/MainDoiMatKhau';
import MainGioiThieu from './components/user/gioithieu/MainGioiThieu';
import HomeBanner from './components/user/home/HomeBanner';
import MainHome from './components/user/home/MainHome';
import MainInfo from './components/user/info/MainInfo';
import Banner from './components/user/layout/Banner';
import LayoutUser from './components/user/layout/LayoutUser';
import MainLichSu from './components/user/lichsu/MainLichSu';
import MainLienHe from './components/user/lienhe/MainLienHe';
import FruitsShop from './components/user/shop/FruitsShop';
import MainShop from './components/user/shop/MainShop';
import MainSuccess from './components/user/success/MainSuccess';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutUser />}>
          <Route index element={<MainHome />} />
          <Route path="gioithieu" element={<MainGioiThieu />} />
          <Route path="lienhe" element={<MainLienHe />} />
          <Route path="chitiet" element={<MainDetail />} />
          <Route path="giohang" element={<MainCart />} />
          <Route path="thanhtoan" element={<Maincheckout />} />
          <Route path="cuahang" element={<MainShop />} />
          <Route path="cc" element={<Example1 />} />
          <Route path="lichsu" element={<MainLichSu />} />
          <Route path="success" element={<MainSuccess />} />
          <Route path="thongtin" element={<MainInfo />} />
          <Route path="doimatkhau" element={<MainDoiMatKhau />} />
          <Route path="dangnhap" element={<MainDangNhap />} />
          <Route path="dangki" element={<MainDangKi />} />
          <Route path="404" element={<Main404 />} />
          <Route path="*" element={<Main404 />} />
        </Route>

        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="" index element={<MainHomeAddd />} />
          <Route path="loaisanpham" element={<LoaiSanPhamAd />} />
          <Route path="hoadon" element={<HoaDonHomeAd />} />
          <Route path="loaitaikhoan" element={<LoaiTaiKhoanAd />} />
          <Route path="sanpham" element={<SanPhamHomeAd />} />
          <Route path="khachhang" element={<TaiKhoanKhachHomeAd />} />
          <Route path="noibo" element={<TaiKhoanNoiBoHomeAd />} />
          <Route path="thongbao" element={<ThongbaoHomeAd />} />
          <Route path="test" element={<BackCardHomeAd />} />
        </Route>

        <Route path="/login" element={<MainLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;