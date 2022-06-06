import { Grid, Typography } from '@mui/material';
import React from 'react';

function PaymentDetails(props) {
  const { formValues } = props;
  // const classes = useStyles();
  const { accountNumber, email, username } = formValues;
  return (
    <Grid item container direction="column" xs={12} sm={6}>
      <Typography variant="h6" gutterBottom style={{ marginTop: "16px"}}>
        Payment details using E-Bank
      </Typography>
      <Grid container>
        <React.Fragment>
          <Grid item xs={6}>
            <Typography gutterBottom>Payment Method</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>E-Bank</Typography>
          </Grid>
        </React.Fragment>
        <React.Fragment>
          <Grid item xs={6}>
            <Typography gutterBottom>Email</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>
              {email}
            </Typography>
          </Grid>
        </React.Fragment>
        <React.Fragment>
          <Grid item xs={6}>
            <Typography gutterBottom>Account holder</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{username}</Typography>
          </Grid>
        </React.Fragment>
        <React.Fragment>
          <Grid item xs={6}>
            <Typography gutterBottom>Account number</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{accountNumber}</Typography>
          </Grid>
        </React.Fragment>
      </Grid>
    </Grid>
  );
}

export default PaymentDetails;
