import { Grid, Typography } from '@mui/material';
import React from 'react';

function PaymentDetails(props) {
  const { formValues } = props;
  const { firstName, lastName, address1 } = formValues;
  return (
    <Grid item xs={12} sm={6}>
      <Typography variant="h6" gutterBottom style={{marginTop: "16px"}}>
        Shipping
      </Typography>
      <Typography gutterBottom>{`${firstName} ${lastName}`}</Typography>
      <Typography gutterBottom>{`${address1}`}</Typography>
    </Grid>
  );
}

export default PaymentDetails;
