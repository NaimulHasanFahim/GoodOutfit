
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./addnewproduct.scss";

import axios from "axios";
import { useEffect } from "react";
const AddProduct = ({ inputs }) => {
  const [file, setFile] = useState("");
  const [products, setProducts] = useState(null);
  
  useEffect(()=>{
    const getProducts = async () =>{
      try {
        const res = await axios.get("http://localhost:3006/api/product/showall");
        // console.log(res);
        setProducts(res.data?.result);
      } catch (error) {
        console.log("Error in the API Call of Supplier show all products " + error.message) 
      }
    };
    getProducts();
  }, []);
  console.log(products)

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label >
                  Image
                </label>
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;