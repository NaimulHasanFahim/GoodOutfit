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
  let tempList = [];

  useEffect(() => {
    
    const updateDataFromSupplier = async() =>{
      let orderUpdate = [];
      data.map((singleOrder) =>
      orderUpdate.push({
        id: singleOrder.transactionId,
        ecom_orderId: singleOrder.ecom_orderId,
        status: singleOrder.status,
        productId: singleOrder.productId
      })
    );
    }

    
    const getOrdersDataFromSupplier = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3006/api/order/showall`
        );
        console.log(data);
        setData(data);

        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getOrdersDataFromSupplier();
    updateDataFromSupplier();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleView = (id) => {
    console.log(id);
    navigate(`/admin/orders/${id}`);
  };

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

  if (loading === false) {
    data.map((temp) =>
      tempList.push({
        id: temp.transactionId,
        ecom_orderId: temp.ecom_orderId,
        address: temp.address,
        status: temp.status,
        quantity: temp.quantity,
      })
    );
  }

  console.log(tempList);

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
            {tempList.length === 0 ? (<div>No order is palaced to supplier at this moment.</div>) : (
                <DataGrid
                className="datagrid"
                rows={tempList}
                columns={userColumns}
                pageSize={9}
                rowsPerPageOptions={[9]}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierOrderDatatable;
