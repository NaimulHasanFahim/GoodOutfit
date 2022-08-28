import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

const ProductsDatatable = () => {
  const [data, setData] = useState(useSelector(state=>state.admin.productsDetails));
  console.log(data);
  
  let tempList = [];

  data.map((temp) => (
    tempList.push({id: temp._id, title : temp.title, sellerpayment : temp.sellerpayment, price : temp.price, sellerID : "1", inStock : temp.inStock  })
  ));
  console.log(tempList);


  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
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
            checkboxSelection
            />
            </div>
            </div>
        </div>
      );
};

export default ProductsDatatable;