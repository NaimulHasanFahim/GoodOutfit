import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from './pages/Login';
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Signup from "./pages/Signup";

function App() {
  const user = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
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
