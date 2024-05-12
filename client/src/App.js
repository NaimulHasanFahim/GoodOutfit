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
import OrdersDatatable from "./components/datatable/OrdersDatatable";
import ProductsDatatable from "./components/datatable/ProductsDatatable";
import SupplierOrderDatatable from "./components/datatable/SupplerOrdersDatatable";
import UsersDatatable from "./components/datatable/UsersDatatable";
import { userInputs } from "./formSource";
import AdminHome from './pages/home/AdminHome';
import AddProduct from "./pages/new/AddNewProduct";
import New from './pages/new/New';
import SingleOrder from './pages/single/SingleOrder';
import SingleProduct from './pages/single/SingleProduct';
import SingleUser from './pages/single/SingleUser';
function App() {
  
  const [user, setUser] =useState( useSelector(state=>state.user.currentUser) );
  const [data, setData] = useState(useSelector(state=>state.admin.productsDetails));
  let isAdmin = false;
  
  if(user!=null){
    isAdmin = user?.isAdmin;
  }
  
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
        <Route index element={(isAdmin ? <AdminHome user={user}/> : <Navigate to='/'/> )}/>
        <Route path="/admin/users">
          <Route index element={(isAdmin ? <UsersDatatable/> : <Navigate to='/'/>)}/>
          <Route path=":userId" element={(isAdmin ? <SingleUser/>  : <Navigate to='/'/>)}/>
          <Route path="new" element={(isAdmin ? <New inputs={userInputs} title="Add New User" />  : <Navigate to='/'/>)}/>
        </Route>
        <Route path="/admin/products">
          <Route index element={(isAdmin ? <ProductsDatatable data={data} setData={setData}/>  : <Navigate to='/'/>)}/>
          <Route path=":productId" element={(isAdmin ? <SingleProduct/>  : <Navigate to='/'/>)}/>
          <Route path="new" element={(isAdmin ? <AddProduct />  : <Navigate to='/'/>)}/>
        </Route>
        <Route path="/admin/orders">
          <Route index element={(isAdmin ?  <OrdersDatatable/> : <Navigate to='/'/>)}/>
          <Route path=":orderId" element={(isAdmin ? <SingleOrder/>  : <Navigate to='/'/>)}/>
          <Route path="new" element={(isAdmin ? <New inputs={userInputs} title="Add New Order" />  : <Navigate to='/'/>)}/>
        </Route>

        <Route path="/admin/palacedorders">
          <Route index element={(isAdmin ?  <SupplierOrderDatatable/> : <Navigate to='/'/>)}/>
          <Route path=":orderId" element={(isAdmin ? <SingleOrder/>  : <Navigate to='/'/>)}/>
        </Route>
      </Route>

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
