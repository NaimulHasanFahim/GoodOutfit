import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import "./table.scss";

const TableHome = ({ orders }) => {
  const navigate = useNavigate();

  const handleOrderClick = (event) => {
    const temp = event.target.getAttribute("id");
    navigate(`/admin/orders/${temp}`);
  };
  const handleUserClick = (event) => {
    const temp = event.target.getAttribute("id");
    navigate(`/admin/users/${temp}`);
  };
  
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders !=null && orders.map((row) => (
            <TableRow key={row._id}>
              <TableCell
                style={{ cursor: "pointer" }}
                className="tableCell"
                onClick={handleOrderClick}
                id={row._id}
              >
                {row._id}
              </TableCell>
              <TableCell
                style={{ cursor: "pointer" }}
                id={row.userId}
                onClick={handleUserClick}
                key={row.userId}
                className="customer"
              >
                {row.userId}
              </TableCell>
              <TableCell className="tableCell">{row.createdAt}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">Online Payment</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableHome;
