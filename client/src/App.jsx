import React, { useContext } from "react";
import Appcontext from "./context/Appcontext";
import Showproduct from "./components/product/Showproduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";
import Navbar from "./components/Navbar";
import SearchProduct from "./components/product/SearchProduct";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Cart from "./components/Cart";
import Address from "./components/Address";
import Checkout from "./components/Checkout";

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Showproduct />} />
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/product/search/:term" element={<SearchProduct/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/address" element={<Address/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
    </Router>
  );
};

export default App;
