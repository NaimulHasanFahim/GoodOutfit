import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./../../pages/list/list.scss";
import "./datatable.scss";

const userColumns = [
  { field: "id", headerName: "Order ID", width: 200 },
  {
    field: "transactionId",
    headerName: "Transaction ID",
    width: 200,
    // renderCell: (params) => {
    //   return (
    //     <div className="cellWithImg">
    //       <img className="cellImg" src={params.row.img} alt="avatar" />
    //       {params.row.username}
    //     </div>
    //   );
    // },
  },
  {
    field: "userId",
    headerName: "User ID",
    width: 200,
  },
  {
    field: "address",
    headerName: "Delivery Address",
    width: 200,
  },
  // {
  //   field: "bankid",
  //   headerName: "Bank ID",
  //   width: 200,
  // },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    // renderCell: (params) => {
    //   return (
    //     <div className={`cellWithStatus ${params.row.status}`}>
    //       {params.row.status}
    //     </div>
    //   );
    // },
  },
];

//temporary data

const UsersDatatable = () => {
  const [data, setData] = useState(useSelector(state=>state.admin.ordersDetails));
  // console.log(data);
  
  let tempList = [];

  data.map((temp) => (
    tempList.push({id: temp._id, transactionId : temp.transactionId, userId : temp.userId, address : temp.address, status : temp.status })
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
                    All Orders
                    <Link to="/users/new" className="link">
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

export default UsersDatatable;