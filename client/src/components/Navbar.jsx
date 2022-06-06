import { Search } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  /* height: 60px; */
  height: 60px ;
  align-items: center ;
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

const Navbar = () => {
  const cart = useSelector(state=>state.cart);
  console.log(cart);


  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContanier>
            <Input placeholder="Search"  />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContanier>
        </Left>
        <Center>
          <Link to="/" style={{textDecoration : "none", color: "black"}}>
          <Logo>E-COMMERCE</Logo>
          </Link>
        </Center>
        <Right>
        <MenuItem><Link style={{ textDecoration: 'none', color:"black" }} to='/signin'>SIGNIN</Link></MenuItem>
          <MenuItem><Link style={{ textDecoration: 'none', color:"black" }} to='/signup'>SIGNUP</Link></MenuItem>
          
          <MenuItem>
          <Link Link style={{ textDecoration: 'none', color:"black" }} to='/cart'>
            <Badge badgeContent={cart.quantity} color="primary">
              <ShoppingCartIcon />
            </Badge>
            </Link>
          </MenuItem>
          {/* </Link> */}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
