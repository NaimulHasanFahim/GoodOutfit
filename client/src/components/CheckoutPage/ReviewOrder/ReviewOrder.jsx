import { Grid, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import React from 'react';
import styled from 'styled-components';
import PaymentDetails from './PaymentDetails';
import ProductDetails from './ProductDetails';
import ShippingDetails from './ShippingDetails';

const Container = styled.div``;


const ReviewOrder = ({cart, bankid})=>{
  const { values: formValues } = useFormikContext();
  // console.log(cart);
  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <ProductDetails cart={cart}/>
      <Grid container spacing={2}>
        <ShippingDetails formValues={formValues} />
        <PaymentDetails formValues={formValues} bankid={bankid} />
      </Grid>
    </Container>
  );
}

export default ReviewOrder;
