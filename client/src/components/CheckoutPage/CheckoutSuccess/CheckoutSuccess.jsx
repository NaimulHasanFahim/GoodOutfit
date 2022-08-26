import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
width: 100% ;
height: 60vh ;
margin: 2rem;
`;

const  CheckoutSuccess = ({newOrderId})=>{
  console.log(newOrderId);
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Thank you for your order.
      </Typography>
      <Typography variant="subtitle1">
        Your order number is {newOrderId}. We have emailed your order confirmation,
        and will send you an update when your order has shipped.
      </Typography>
    </Container>
  );
}

export default CheckoutSuccess;
