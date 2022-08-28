import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersData, getProductsData, getUsersData, getWidgetData } from '../../actions/admin';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TableHome from "../../components/table/TableHome";
import Widget from '../../components/widget/Widget';
import "./home.scss";

const AdminHome = ({user}) => {
  const dispatch = useDispatch();
  const [widget, setWidget] = useState(useSelector(state=>state.admin.widgetDetails));
  const [orders, setOrders] = useState(useSelector(state=>state.admin.ordersDetails));
  const [products, setProducts] = useState(useSelector(state=>state.admin.productsDetails));
  const [users, setUsers] = useState(useSelector(state=>state.admin.usersDetails));
  
  
  // console.log(user);
  
  useEffect(() => {
    
    const getAllData = (  )=>{
      dispatch(getWidgetData(user.existingUser, setWidget));
      dispatch(getOrdersData(user.existingUser, setOrders));
      dispatch(getProductsData(user.existingUser, setProducts));
      dispatch(getUsersData(user.existingUser, setUsers));
    }

    getAllData();
  }, []);

  // console.log(orders);
  // console.log(widget);
  // console.log(users);
  // console.log(products);

  return (
    <div className='home'>
      <Sidebar/>
      <div className="homeContainer">
        <Navbar/>
        <div className="widgets">
          <Widget type="user" amount = {widget.numOfUsers}/>
          <Widget type="order" amount = {widget.numOfOrders}/>
          <Widget type="products" amount = {widget.numOfProducts}/>
          <Widget type="earning" amount={100}/>
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Orders</div>
          <TableHome orders={orders}/>
        </div>
        
      </div>
    </div>
  )
}

export default AdminHome;