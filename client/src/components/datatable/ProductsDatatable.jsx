import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProductById } from "../../actions/admin";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./../../pages/list/list.scss";
import "./datatable.scss";

const userColumns = [
  { field: "id", headerName: "Product ID", width: 200 },
  {
    field: "title",
    headerName: "Title",
    width: 200,
   },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "sellerID",
    headerName: "Seller ID",
    width: 200,
  },
  // {
  //   field: "bankid",
  //   headerName: "Bank ID",
  //   width: 200,
  // },
  {
    field: "sellerpayment",
    headerName: "Seller Payment ID",
    width: 150,
  },
  {
    field: "inStock",
    headerName: "In Stock",
    width: 100,
  },
];

//temporary data

const ProductsDatatable = ({data}) => {
  const [products, setProducts] = useState(data);
  const [user, setUser] =useState( useSelector(state=>state.user.currentUser) );
  const navigate = useNavigate();
  const [deleteHandle, setDeleteHandle] = useState(true);
 
  const dispatch = useDispatch();
  let tempList = [];
  // console.log(data1);

  products.map((temp) => (
    tempList.push({id: temp._id, title : temp.title, sellerpayment : temp.sellerpayment, price : temp.price, sellerID : temp.supplierId, inStock : temp.inStock  })
  ));
  console.log(tempList);
  console.log(products);

  const handleDelete = (id) => {
    console.log(id);
    const formData = { 
      productId : id,
      isAdmin : user.existingUser.isAdmin
    };
    dispatch(deleteProductById(formData, user.existingUser, setProducts));
    tempList=[];
    setDeleteHandle(!deleteHandle);
    // setData()
    window.location.reload();
    // setData(data.filter((item) => item.id !== id)); 
  };
  useEffect(()=>{
    const getProducts = async () =>{
      try {
        const res = await axios.get("http://localhost:5000/products" );
        // console.log(res);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [deleteHandle]);

  const handleView = (id) =>{
    console.log(id);
    navigate(`/admin/products/${id}`);

  }


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}> */}
              <div className="viewButton" onClick={()=>handleView(params.row.id)}>View</div>
            {/* </Link> */}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

    return (
        <div className="list">
          <Sidebar />
          <div className="listContainer">
            <Navbar />
            <div className="datatable">
                <div className="datatableTitle">
                    All Products
                    <Link to="/admin/products/new" className="link">
                        Add New
                    </Link>
                </div>
            <DataGrid
            className="datagrid"
            rows={tempList}
            columns={userColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            />
            </div>
            </div>
        </div>
      );
};

export default ProductsDatatable;