import FacebookMsg from './components/FacebookMsg';
import Example from './components/NewE';
import MainCart from './components/user/cart/MainCart';
import Maincheckout from './components/user/checkout/Maincheckout';
import MainDetail from './components/user/detail/MainDetail';
import MainGioiThieu from './components/user/gioithieu/MainGioiThieu';
import HomeBanner from './components/user/home/HomeBanner';
import MainHome from './components/user/home/MainHome';
import Banner from './components/user/layout/Banner';
import LayoutUser from './components/user/layout/LayoutUser';
import MainLienHe from './components/user/lienhe/MainLienHe';
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
