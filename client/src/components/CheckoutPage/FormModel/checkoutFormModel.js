export default {
  formId: "checkoutForm",
  formField: {
    firstName: {
      name: "firstName",
      label: "First name*",
      requiredErrorMsg: "First name is required",
    },
    lastName: {
      name: "lastName",
      label: "Last name*",
      requiredErrorMsg: "Last name is required",
    },
    address1: {
      name: "address1",
      label: "Address Line 1*",
      requiredErrorMsg: "Address Line 1 is required",
    },
    address2: {
      name: "address2",
      label: "Address Line 2",
    },
    city: {
      name: "city",
      label: "City*",
      requiredErrorMsg: "City is required",
    },
    state: {
      name: "state",
      label: "District",
    },
    zipcode: {
      name: "zipcode",
      label: "Zipcode*",
      requiredErrorMsg: "Zipcode is required",
      invalidErrorMsg: "Zipcode is not valid (e.g. 3344)",
    },
    useAddressForPaymentDetails: {
      name: "useAddressForPaymentDetails",
      label: "Use this address for payment details",
    },
    username: {
      name: "username",
      label: "Name of Account*",
      requiredErrorMsg: "Name of the Bank Account is required",
    },
    email: {
      name: "email",
      label: "Email of the Account Holder*",
      requiredErrorMsg: "Email of the Bank Account user",
    },
    accountNumber: {
      name: "accountNumber",
      label: "Account number*",
      requiredErrorMsg: "Account number is required",
      invalidErrorMsg: "Account number is not valid (e.g. 01811111111)",
    },
  },
};

