import { Grid, Typography } from '@mui/material';
import React from 'react';
import styled from "styled-components";
import { InputField } from '../../FormFields';



const Container = styled.div`
width: 100% ;
height: 70% ;
`;


export default function PaymentForm(props) {
  const {
    formField: { nameOnCard, cardNumber }
  } = props;

  return (
    <Container>
      <Typography style={{marginTop: "5px", marginBottom: "5px"}} variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={8} md={12}  fullWidth>
          <InputField
            name={nameOnCard.name}
            label={nameOnCard.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={8} md={12}>
          <InputField
            name={cardNumber.name}
            label={cardNumber.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={8} md={12}>
          <InputField type="password"
            name="password"
            label="Password"
            fullWidth
          />
        </Grid>
      </Grid>
      </Container>
  );
}
