import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./../../pages/list/list.scss";
import "./datatable.scss";

const userColumns = [
  { field: "id", headerName: "Transaction ID", width: 200 },
  {
    field: "ecom_orderId",
    headerName: "User Order ID",
    width: 200,
  },
  {
    field: "address",
    headerName: "Delivery Address",
    width: 200,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
  },
];
const SupplierOrderDatatable = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [called, setCalled] = useState(false);
  let tempList = [];
  let orderUpdate = [];

  useEffect(() => {
    
    const getOrdersDataFromSupplier = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3006/api/order/showall`
        );
        // console.log(data);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
      setCalled(false);
    };
    getOrdersDataFromSupplier();
    // handleUpdate();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleView = (id) => {
    console.log(id);
    navigate(`/admin/orders/${id}`);
  };
  async function handleUpdate() {
    setLoading(true);
    orderUpdate.map(async (orderUp) => {
      const { ecom_orderId, status, productId} = orderUp;
      
      
      let orderStatusApiCallResult = [];
      try {
        // API CALL TO ECOMMERCE BACKEND TO UPDATE ORDER STATUS
        const { data } = await axios.post(`http://localhost:5000/orders/update/delivery`, {ecom_orderId, status, productId, isAdmin : true});
        console.log(data);
        orderStatusApiCallResult = [...orderStatusApiCallResult, data];
      } catch (error) {
        console.log(error);
      }
      // console.log(orderStatusApiCallResult);
    });
    setLoading(false);
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
            <div
              className="viewButton"
              onClick={() => handleView(params.row.id)}
            >
              View
            </div>
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

  if (loading === false && data !== null) {
    data.map((temp) =>{
    
      orderUpdate.push({
        ecom_orderId: temp.ecom_orderId,
        status: temp.status,
        productId : temp.ecom_prodId
      });
    tempList.push({
        id: temp.transactionId,
        ecom_orderId: temp.ecom_orderId,
        address: temp.address,
        status: temp.status,
        quantity: temp.quantity
      });
    }
    );  
  }
  if(called === false && orderUpdate !== null){
    handleUpdate();
    setCalled(true);
  }
  // console.log(tempList);
  console.log(orderUpdate);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {loading === true || data === null ? (
          <div>
            <div>Processing Request</div>
            <div className="loader-container">
              <div className="spinner"></div>
            </div>
          </div>
        ) : (
          <div style={{height : "100%"}}>
            {/* {tempList.length === 0 ? (<div>No order is palaced to supplier at this moment.</div>) : ( */}
                  <div style={{width: "100%", fontSize: "24px",color: "gray", margin: "10px 10px", display : "flex", justifyContent : "center"}} className="datatableTitle">
                    Products Ordered to Supplier
                  </div>
                <DataGrid
                className="datagrid"
                rows={tempList}
                columns={userColumns}
                pageSize={9}
                rowsPerPageOptions={[9]}
                sx={{
                  boxShadow: 2,
                  border: 2,
                  borderColor: 'teal',
                  '& .MuiDataGrid-cell:hover': {
                    color: 'teal',
                  },
                }}
                />
            {/* )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierOrderDatatable;
