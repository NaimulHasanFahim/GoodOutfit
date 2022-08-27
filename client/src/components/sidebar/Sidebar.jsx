import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{textDecoration:"none"}}>
        <span className="logo">E-Admin</span>
        </Link>
      </div>
      <hr></hr>

      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
          <Link to="/admin" style={{textDecoration:"none"}}>
            <DashboardIcon className='icon'/>
            <span>Dashboard</span>
          </Link>
          </li>
          <p className="title">LISTS</p>
          
          <li>
          <Link to="/admin/users" style={{textDecoration:"none"}}>
            <PersonOutlineIcon className='icon'/>
            <span>Users</span>
          </Link>
          </li>
          <li>
          <Link to="/admin/products" style={{textDecoration:"none"}}>
            <StoreIcon className='icon'/>
            <span>Products</span>
          </Link>
          </li>
          <li>
          <Link to="/admin/orders" style={{textDecoration:"none"}}>
            <CreditCardIcon className='icon'/>
            <span>Orders</span>
          </Link>
          </li>
          <p className="title">USER</p>
          <li>
            <ExitToAppIcon className='icon'/>
            <span>Logout</span>
          </li>
        </ul>
      </div>

      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default Sidebar;
