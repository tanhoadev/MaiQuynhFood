import FacebookMsg from './components/FacebookMsg';
import Example from './components/NewE';
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
