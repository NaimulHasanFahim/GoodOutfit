import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./single.scss";

const SingleProduct = () => {
  const productId = useParams()
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const [user, setUser] = useState( useSelector((state) => state.user.currentUser));
  const [called, setCalled] = useState(0);

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getProductById = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/products/find/${productId.productId}`,
          );
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getProductById();
    // checkDelivery();
  }, [productId]);
  
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
        ) :(
        <div className="top">
          <div className="left">
            <h1 className="title">Product ID : {product._id}</h1>
            <div className="item">
              <img
                src={product.img}
                alt=""
                className="productImg"
              />
              <div className="details">
                <h1 className="itemTitle">{product.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">{product.desc}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price</span>
                  <span className="itemValue">{product.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Supplier ID : </span>
                  <span className="itemValue">
                    {product.supplierId }
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Supplier Product ID : </span>
                  <span className="itemValue">
                    {product.supplierProdId }
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Supplier Bak ID : </span>
                  <span className="itemValue">{product.supplerBankId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>)}
      </div>
    </div>
  );
};

export default SingleProduct;
