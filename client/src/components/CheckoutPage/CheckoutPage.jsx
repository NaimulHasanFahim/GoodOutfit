import {
  Button, CircularProgress, Step,
  StepLabel, Stepper, Typography
} from '@mui/material';
import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { createOrder } from '../../actions/orders';
import CheckoutSuccess from './CheckoutSuccess/CheckoutSuccess';
// import CheckoutSuccess from './CheckoutSuccess';
import { clearCart } from './../../redux/cartRedux';
import checkoutFormModel from './FormModel/checkoutFormModel';
import formInitialValues from './FormModel/formInitialValues';
import validationSchema from './FormModel/validationSchema';
import AddressForm from './Forms/AddressForm';
import PaymentForm from './Forms/PaymentForm';
import ReviewOrder from './ReviewOrder/ReviewOrder';

const Container = styled.div`
  `;


const steps = ['Shipping address', 'Payment details', 'Review your order', 'Success'];
const { formId, formField } = checkoutFormModel;

function _renderStepContent(step, cart, bankid) {
  switch (step) {
    case 0:
      return <AddressForm formField={formField} />;
    case 1:
      return <PaymentForm formField={formField} />;
    case 2:
      return <ReviewOrder cart={cart} bankid={bankid}/>;
    case 3:
      return <CheckoutSuccess/>
    default:
      return <div>Not Found</div>;
  }
}

const API = axios.create({ baseURL: 'http://localhost:8000/api' });

const CheckoutPage = ({cart, currentUser}) =>{
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length-2;
  const dispatch = useDispatch();
  const [ newOrderId,setNewOrderId] = useState(null);
  const bankid = currentUser.bankid;

  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    const temp =JSON.stringify(values, null, 2);
    // (currentUser, cart, addressData, bankData)
    
    const addressData = {"address1" : values.address1, "city" : values.city};
    const bankData ={"sender" : bankid,"transactionId" : "", "reciever" : "01521532529" , "password" : values.password, "amount" : cart.total};
    
    try{
      const ans = API.post('/transaction/payment', bankData);
      ans.then(function(result){
        let transactionId = result.data.transactionId;
        dispatch(createOrder(currentUser, cart, addressData, transactionId, setNewOrderId));
        dispatch(clearCart());
      })
    }catch(error){
      console.log(error);
    }
    actions.setSubmitting(false);
    setActiveStep(activeStep + 1);
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <Container>
      <Typography style={{marginTop : "5px", marginBottom : "5px"}} component="h1" variant="h5" align="center">
        Checkout
      </Typography>
      <Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length-1 ? (
          <CheckoutSuccess newOrderId={newOrderId}/>
        ) : (
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep, cart, bankid)}
                {/* Button portion */}
                <div style={{display: 'flex',justifyContent: 'flex-end'}}>
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack} style={{ marginTop: '1rem', marginLeft: '1rem'}}>
                      Back
                    </Button>
                  )}
                  <div style={{margin: '8px', position: 'relative'}}>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ marginTop: '1rem', marginLeft: '1rem'}}
                    >
                      {isLastStep ? 'Place order' : 'Next'}
                    </Button>
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        style={{position: 'absolute',
                        top: '50%',
                        left: '50%'}}
                      />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
      </Container>
  );
}

export default CheckoutPage;