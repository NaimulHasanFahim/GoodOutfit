import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./single.scss";

import styled from "styled-components";

const VerifyNow = styled.div`
  padding: 2px 5px;
  border-radius: 5px;
  color: teal;
  border: 1px dotted teal;
  cursor: pointer;
  width: 20%;
`;

const SingleOrder = () => {
  // const params = new URLSearchParams(window.location.pathname);
  const orderId = useParams();
  // console.log(orderId);
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();
  const [user, setUser] = useState(
    useSelector((state) => state.user.currentUser)
  );
  const [called, setCalled] = useState(0);

  const [loading, setLoading] = useState(true);
  const API = axios.create({ baseURL: "http://localhost:8000/api" });

  useEffect(() => {
    const getOrderById = async () => {
      try {
        const { data } = await axios.post(
          `http://localhost:5000/orders/${orderId.orderId}`,
          { isAdmin: user.isAdmin }
        );
        // console.log(data);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getOrderById();
    // checkDelivery();
  }, [orderId]);

  const checkDelivery = () =>{
    setCalled(true);
    let countProd =0;
    let countDelivery =0;
    order.products.map((temp) =>{ 
      countProd ++;
      if(temp.delivery === "Shipped"){
        countDelivery++;
      }})

      if(countDelivery === countProd){
        console.log(countDelivery + "  del -- prod   " + countProd);
        try {
          const respo1 = axios.post( `http://localhost:5000/orders/update/${orderId.orderId}`,
            { isAdmin: user.isAdmin, updatedData : { status : "Shipped" } });
            console.log(respo1);
            window.location.reload();
        } catch (error) {
          
        }
      }
  }

  async function payToSellerAndPlaceOrder(event) {
    event.preventDefault();
    let supplerTransaction = [];
    // console.log(event.target.id);
    setLoading(true);
    const prodList = order.products;
    prodList.map(async (orderProd) => {
      const { price, supplerProdId, supplierBankId, supplierId, _id } =
        orderProd.productId;
      const quantity = orderProd.quantity;
      const address = order.address;
      // console.log(orderProd);

      const bankData = {
        amount: (price - 10) * quantity,
        sender: "01521532529",
        reciever: supplierBankId,
        password: "12345",
      };

      let bankApiCallResult = [];
      try {
        // API CALL TO BANK FOR PAYMENT
        const { data } = await API.post(`/transaction/payment`, bankData);
        bankApiCallResult = [...bankApiCallResult, data];
        let transactionId = data.transactionId;
        if (transactionId != null) {
          console.log(orderProd.productId._id);
          supplerTransaction.push({productId : _id,transactionId : transactionId})
          
          //API CALL TO PALACE ORDER TO SUPPLIER
          try {
            const { data } = await axios.post(
              `http://localhost:3006/api/order/add`,
              {
                productId: supplerProdId,
                supplierId: supplierId,
                transactionId: transactionId,
                address: address,
                price: price,
                quantity: quantity,
                ecom_orderId: order._id,
                status: "Pending",
                ecom_prodId: orderProd.productId._id
              }
            );
            console.log(data);
            if(data?.message === "Product creation successfull"){
              const respo1 = axios.post(
                `http://localhost:5000/orders/update/${orderId.orderId}`,
                { isAdmin: user.isAdmin, updatedData : { supplierPaid : true } });
                console.log(respo1);
                window.location.reload();
            }
          } catch (error) {
            console.log(
              "Error inside the palace order to supplier " + error.message
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
      // console.log(bankApiCallResult);
    });
    // console.log(supplerTransaction);
    // try {
    //   const res = axios.post(
    //     `http://localhost:5000/orders/update/${orderId.orderId}`,
    //     { isAdmin: user.isAdmin, updatedData : { supplierPaid : true, supplierTransactionId : supplerTransaction } });
    //     console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }

    setLoading(false);
  }

  async function verifyTransaction(event) {
    event.preventDefault();
    console.log(event.target.id);
    setLoading(true);

    try {
      await API.get(`/transaction/verify/${event.target.id}`).then(function (result) {
        console.log(result);
        if (result?.data?.message === "verified") {
          // console.log(userisAdmin);
          const res = axios.post(
            `http://localhost:5000/orders/update/${orderId.orderId}`,
            { isAdmin: user.isAdmin, updatedData : { userTransactionVerified : true} }
          );
          // console.log(res);
          window.location.reload();
        }
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  if(order != null && order.status === "Pending"){
    if( called === 0){
      setCalled(10);
      checkDelivery();
    }
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {loading === true ? (
          <div>
            <div>Processing Request</div>
            <div className="loader-container">
              <div className="spinner"></div>
            </div>
          </div>
        ) : (
          <div>
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
                        {order.userTransactionVerified === true ? (
                          <img
                            style={{ marginLeft: "5px" }}
                            src="https://img.icons8.com/ios-filled/16/000000/approval.png"
                            alt="verfied"
                          />
                        ) : (
                          <VerifyNow
                            id={order.transactionId}
                            onClick={verifyTransaction}
                          >
                            Verify Now
                          </VerifyNow>
                        )}
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
                  {order.supplierPaid === true ? (
                    <button id={order._id} disabled>
                      PAID TO SUPPLIER
                    </button>
                  ) : (
                    <button id={order._id} onClick={payToSellerAndPlaceOrder}>
                      Pay to Supplier
                    </button>
                  )}
                </div>
                <div className="right">
                  <div className="item">
                    <div className="details">
                      <h1 className="itemTitle">Products</h1>
                      {order.products.map((temp) => (
                        <div className="detailItem" key={temp.productId._id}>
                          <div>
                            <span className="itemKey">Product ID : </span>
                            <span className="itemValue">
                              {temp.productId._id}{" "}
                            </span>
                          </div>
                          <div>
                            <span className="itemKey">Product Title :</span>
                            <span className="itemValue">
                              {temp.productId.title}
                            </span>
                          </div>
                          <div>
                            <span className="itemKey">Quantity :</span>
                            <span className="itemVaule">{temp.quantity}</span>
                          </div>
                          <div>
                            <span className="itemKey">Delivery Status:</span>
                            <span className="itemVaule">{temp.delivery}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
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
