import { Grid, Typography } from '@mui/material';
import React from 'react';
import { InputField } from '../../FormFields';

export default function PaymentForm(props) {
  const {
    formField: { nameOnCard, cardNumber }
  } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InputField
            name={nameOnCard.name}
            label={nameOnCard.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name={cardNumber.name}
            label={cardNumber.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
