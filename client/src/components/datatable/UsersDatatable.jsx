import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUsersData } from "../../actions/admin";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./../../pages/list/list.scss";
import "./datatable.scss";

const userColumns = [
  { field: "id", headerName: "User ID", width: 200 },
  {
    field: "username",
    headerName: "User Name",
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
    field: "email",
    headerName: "Email",
    width: 200,
  },

  {
    field: "bankid",
    headerName: "Bank ID",
    width: 200,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

//temporary data

const UsersDatatable = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    useSelector((state) => state.user.currentUser)
  );
  const [users, setUsers] = useState(
    useSelector((state) => state.admin.usersDetails)
  );
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllData = () => {
      dispatch(getUsersData(user, setUsers));
      setLoading(false);
    };

    getAllData();
  }, []);
  console.log(users);

  let tempList = [];

  users.map((temp) =>
    tempList.push({
      id: temp._id,
      bankid: temp.bankid,
      username: temp.username,
      email: temp.email,
    })
  );
  console.log(tempList);

  const handleDelete = (id) => {
    setUser(users.filter((item) => item.id !== id));
  };

  const handleView = (id) => {
    console.log(id);
    navigate(`/admin/users/${id}`);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => handleView(params.row.id)}
            >
              View
            </div>
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
        {loading === true || users === null ? (
          <div>
            <div>Processing Request</div>
            <div className="loader-container">
              <div className="spinner"></div>
            </div>
          </div>
        ) : (
          <div className="datatable">
            <div className="datatableTitle">
              All Users
              <Link to="/admin/users/new" className="link">
                Add New
              </Link>
            </div>
            <DataGrid
              className="datagrid"
              rows={tempList}
              columns={userColumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              sx={{
                boxShadow: 2,
                border: 2,
                borderColor: "teal",
                "& .MuiDataGrid-cell:hover": {
                  color: "teal",
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersDatatable;
