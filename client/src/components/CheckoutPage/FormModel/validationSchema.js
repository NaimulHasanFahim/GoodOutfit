import * as Yup from 'yup';
import checkoutFormModel from './checkoutFormModel';
const {
  formField: {
    firstName,
    lastName,
    address1,
    city,
    state,
    zipcode,
    email,
    username,
    accountNumber,
  }
} = checkoutFormModel;

const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

export default [
  Yup.object().shape({
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
    [address1.name]: Yup.string().required(`${address1.requiredErrorMsg}`),
    [city.name]: Yup.string()
      .nullable()
      .required(`${city.requiredErrorMsg}`),
      [state.name]: Yup.string()
      .nullable()
      .required(`${city.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [email.name]: Yup.string().required(`${email.requiredErrorMsg}`),
    
  })
];
