import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from './pages/Login';
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Signup from "./pages/Signup";

function App() {
  const [user, setUser] =useState( useSelector(state=>state.user.currentUser) );
  console.log(user);

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser}/>} />
        <Route path="/products" element={<ProductList user={user}  setUser={setUser}/>} />
        <Route path="/products/:category" element={<ProductList user={user} setUser={setUser}/>} />
        <Route path="/product/:id" element={<Product user={user} setUser={setUser}/>} />
        <Route path="/cart" element={<Cart user={user} setUser={setUser}/>} />
        <Route path="/checkout" element={<Checkout user={user} setUser={setUser}/>} />
        {/* <Route path="/success" element={<Auth setUserId={setUserId}/>}/> */}
        <Route path="/signin" element={(user ? <Navigate to='/'/> : <Login/> )}/>
        <Route path="/signup" element={(user ? <Navigate to='/'/> : <Signup/> )}/>
       
      </Routes>
    </BrowserRouter>
    // <div className="App">
    // <Home/>
    // </div>
  );
}

export default App;
