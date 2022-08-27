import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from './pages/Login';
import OrderDetails from "./pages/OrderDetails";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

// ADMIN IMPORTS 
import { productInputs, userInputs } from "./formSource";
import AdminHome from './pages/home/AdminHome';
import List from './pages/list/List';
import New from './pages/new/New';
import Single from './pages/single/Single';


function App() {
  const [user, setUser] =useState( useSelector(state=>state.user.currentUser) );
  
  const cart = useSelector((state) => state.cart);
  
  
  return (
    <BrowserRouter>
      <Routes>
        {/* USERS ROUTES */}
        <Route path="/" element={<Home user={user} setUser={setUser}/>} />
        <Route path="/products" element={<ProductList user={user}  setUser={setUser}/>} />
        <Route path="/products/:category" element={<ProductList user={user} setUser={setUser}/>} />
        <Route path="/product/:id" element={<Product user={user} setUser={setUser}/>} />
        <Route path="/cart" element={<Cart user={user} setUser={setUser}/>} />
        <Route path="/checkout" element={<Checkout user={user} setUser={setUser}/>} />
        {/* <Route path="/success" element={<Auth setUserId={setUserId}/>}/> */}
        <Route path="/signin" element={(user ? <Navigate to='/'/> : <Login/> )}/>
        <Route path="/signup" element={(user ? <Navigate to='/'/> : <Signup/> )}/>
        <Route path="/profile" element={<Profile user={user} setUser={setUser}/> }/>
        <Route path="/orderDetails" element={<OrderDetails user={user} setUser={setUser}/> }/>

        {/* ADMIN ROUTES  */}
        <Route path="/admin">
        <Route index element={<AdminHome/>}/>
        <Route path="users">
          <Route index element={<List/>}/>
          <Route path=":userId" element={<Single/>}/>
          <Route path="new" element={<New inputs={userInputs} title="Add New User" />}/>
        </Route>
        <Route path="products">
          <Route index element={<List/>}/>
          <Route path=":productId" element={<Single/>}/>
          <Route path="new" element={<New inputs={productInputs} title="Add New Product" />}/>
        </Route>
      </Route>


      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
