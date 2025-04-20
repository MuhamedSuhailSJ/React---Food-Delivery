import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginIn from "./components/LoginIn/LoginIn";

const App = () => {
  const [showLogin,setshowLogin] = useState(false)
  return (
    <>
      {showLogin ? <LoginIn setshowLogin={setshowLogin} /> : <></>}
      <div className="app">
        <Navbar setshowLogin={setshowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
