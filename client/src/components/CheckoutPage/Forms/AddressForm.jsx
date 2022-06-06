import { Grid, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import InputField from "../../FormFields/InputField";
import SelectField from "../../FormFields/SelectField";


const cities = [
  {
    value: "1",
    label: "Dhaka",
  },
  {
    value: "2",
    label: "Chittagong",
  },
  {
    value: "3",
    label: "Sylhet",
  },
  {
    value: "4",
    label: "Noakhali",
  },
];

const states = [
  {
    value: "1",
    label: "Dhaka",
  },
  {
    value: "2",
    label: "Chittagong",
  },
  {
    value: "3",
    label: "Rangpur",
  },
];


const Container = styled.div`
width: 90% ;
height: 90% ;
`;

export default function AddressForm(props) {
  // console.log(props);
  const {
    formField: {
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zipcode,
    },
  } = props;
  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <InputField name={firstName.name} label={firstName.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={lastName.name} label={lastName.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={address1.name} label={address1.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={address2.name} label={address2.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={city.name}
            label={city.label}
            data={cities}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={state.name}
            label={state.label}
            data={states}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={zipcode.name} label={zipcode.label} fullWidth />
        </Grid>
      </Grid>
    </Container>
  );
}
