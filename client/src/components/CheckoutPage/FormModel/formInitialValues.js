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
    useAddressForPaymentDetails
  }
} = checkoutFormModel;

export default {
  [firstName.name]: '',
  [lastName.name]: '',
  [address1.name]: '',
  [city.name]: '',
  [zipcode.name]: '',
  [useAddressForPaymentDetails.name]: false,
  [email.name]: '',
  [username.name]: '',
  [state.name]: '',
  [accountNumber.name]: '',
};
