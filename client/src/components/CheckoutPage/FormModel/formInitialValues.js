import checkoutFormModel from './checkoutFormModel';
const {
  formField: {
    firstName,
    lastName,
    address1,
    city,
    zipcode,
    useAddressForPaymentDetails,
    nameOnCard,
    cardNumber,
  }
} = checkoutFormModel;

export default {
  [firstName.name]: '',
  [lastName.name]: '',
  [address1.name]: '',
  [city.name]: '',
  [zipcode.name]: '',
  [useAddressForPaymentDetails.name]: false,
  [nameOnCard.name]: '',
  [cardNumber.name]: '',
};
