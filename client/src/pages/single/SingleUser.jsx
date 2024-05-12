import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import TableHomeUser from "../../components/table/TableHomeUser";
import "./single.scss";


const SingleUser = () => {
  const userId = useParams()
  const [singleUser, setSingleUser] = useState(null);
  const [user, setUser] = useState( useSelector((state) => state.user.currentUser));
  const [userOrders, setUserOrders] = useState(null);
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getOrdersById = async () =>{
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/orders/find/${userId.userId}`);
        setUserOrders(data);
      setLoading(false);
    }
    const getUserById = async () => {
      setLoading(true);
      try {
        const { data } = await axios.post(
          `http://localhost:5000/users/find/${userId.userId}`,{isAdmin : user.isAdmin});
        setSingleUser(data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserById();
    getOrdersById();
    // checkDelivery();
  }, [userId]);

  
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {loading === true || singleUser === null ? (
          <div>
            <div>Processing Request</div>
            <div className="loader-container">
              <div className="spinner"></div>
            </div>
          </div>
        ) :(
        <div className="top">
          <div className="left">
            <h1 className="title">User ID : {singleUser._id}</h1>
            <div className="item">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{singleUser.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email : </span>
                  <span className="itemValue">{singleUser.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Bank ID : </span>
                  <span className="itemValue">{singleUser.bankid}</span>
                </div>
              </div>
            </div>
          </div>
        </div>)}
        {userOrders!=null && <div className="bottom">
          <h1 className="title">Lastest Orders</h1>
          <TableHomeUser userOrders={userOrders}/>
        </div>}
      </div>
    </div>
  );
};

export default SingleUser;
