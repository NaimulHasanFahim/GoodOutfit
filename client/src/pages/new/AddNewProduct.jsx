import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addProductFromSupp } from '../../actions/admin';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./addnewproduct.scss";

const AddProduct = () => {
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const [user, setUser] =useState( useSelector(state=>state.user.currentUser) );
 
  

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3006/api/product/showall"
        );
        // console.log(res);
        setProducts(res.data?.result);
      } catch (error) {
        console.log(
          "Error in the API Call of Supplier show all products " + error.message
        );
      }
    };
    getProducts();
  }, []);
  // console.log(products);
  
  const handleStock = (temp)=>{
    if(temp===true){
      return "Yes";
    }
    else{
      return "No"
    }
  }
  const addProduct = (event)=>{
    event.preventDefault();
    console.log(event.target.id);
    let selectedProduct = {};
    products.map((prod)=>{if(prod._id===event.target.id){
      selectedProduct=prod;
    }})
    // console.log(selectedProduct);
    // const selectedProduct = {...temp};

    const supplierBankId = selectedProduct.supplierId.bankid;
    
    const  {title, desc, img, supplierId, _id, inStock, color, size, categories, price } = selectedProduct;
    const formData = {
      title,
      desc,
      isAdmin : true,
      img,
      supplierId,
      supplerProdId: _id,
      categories,
      size,
      color,
      inStock,
      price: price+10,
      supplierBankId : supplierBankId
    }
    // console.log(formData);
    dispatch(addProductFromSupp(formData, user ));
  }
  
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        {products == null ? (
          <div>
          <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
          <CircularProgress color="inherit" />
        </Backdrop></div>
        ) : ( products.map((product) => (
          <div className="bottom">
            <div className="left">
              <img id="productImg"
                src={product.img}
                alt="Product_Image"
              />
            </div>
            <div className="right">
              <form id={product._id}>
                <div className="formInput" >
                    <label>Title</label>
                    <h6>{product.title}</h6>
                </div>
                <div className="formInput">
                    <label>Description</label>
                    <h6>{product.desc}</h6>
                  </div>
                  <div className="formInput" >
                    <label>Category</label>
                    <h6>{product.categories}</h6>
                  </div>
                  <div className="formInput">
                    <label>Price</label>
                    <h6>{product.price}</h6>
                  </div>
                  <div className="formInput">
                    <label>In Stock</label>
                    <h6>{handleStock(product.inStock)}</h6>
                  </div>
                <button id={product._id} onClick={addProduct}>ADD</button>
              </form>
            </div>
          </div>
      )))}
        
        {/* repeat */}
      </div>
    </div>
  );
};

export default AddProduct;
