import { Search } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signout } from "../actions/auth";
const Container = styled.div`
  /* height: 60px; */
  height: 60px;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  flex: 1;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;
const SearchContanier = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Input = styled.input`
  border: none;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Navbar = ({user, setUser}) => {
  // const [user, setUser] = useState(useSelector((state) => state.user.currentuser));
  const cart = useSelector((state) => state.cart);
  // console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogOut =( )=>{
    dispatch(signout(navigate, setUser));
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContanier>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContanier>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Logo>E-COMMERCE</Logo>
          </Link>
        </Center>

        {user===null  || user===undefined ? (
          <Right>
            <MenuItem>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/signin"
              >
                SIGNIN
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/signup"
              >
                SIGNUP
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/cart"
              >
                <Badge badgeContent={cart.quantity} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </Link>
            </MenuItem>
          </Right>
        ) : (
          <Right>
            <MenuItem>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/signin"
              >
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={LogOut}> 
              Logout
            </MenuItem>
            <MenuItem>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/cart"
              >
                <Badge badgeContent={cart.quantity} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </Link>
            </MenuItem>
          </Right>
        )}

        {/* </Link> */}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
