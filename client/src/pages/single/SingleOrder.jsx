import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./single.scss";

const SingleOrder = () => {
  // const params = new URLSearchParams(window.location.pathname);
  const orderId = useParams();
  // console.log(orderId);
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();
  const [user, setUser] = useState(
    useSelector((state) => state.user.currentUser)
  );

  useEffect(() => {
    const getOrderById = async () => {
      try {
        const { data } = await axios.post(
          `http://localhost:5000/orders/${orderId.orderId}`,
          { isAdmin: user.existingUser.isAdmin }
        );
        console.log(data);
        setOrder(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getOrderById();
  }, [orderId]);

  const payToSeller = (event)=>{
    event.preventDefault();
    console.log(event.target.id);
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        
          {order == null ? (
            <div>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </div>
          ) : (
            <div className="top">
            <div className="left">
              <h1 className="title">User Id : {order.userId}</h1>
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">Order ID : {order._id}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Transaction ID : </span>
                    <span className="itemValue">{order.transactionId}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Amount : </span>
                    <span className="itemValue"> {order.amount}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">+1 2345 67 89</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">{order.address}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Status : </span>
                    <span className="itemValue">{order.status}</span>
                  </div>
                </div>
              </div>
              <button id={order._id} onClick={payToSeller}>Pay to Seller</button>
            </div>
            <div className="right">
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">Products</h1>
                  {order.products.map((temp)=>(
                    <div className="detailItem" key={temp.id}>
                      <span className="itemValue">Product ID : {temp.productId} <br/></span>
                      <span className="itemKey">Quantity : {temp.quantity}</span>
                  </div>
                  ))}
                  
                </div>
              </div>
            </div>
            </div>
            
          )}
        

        {/* <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div> */}
      </div>
    </div>
  );
};

export default SingleOrder;
