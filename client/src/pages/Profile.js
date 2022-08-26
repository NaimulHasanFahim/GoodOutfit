
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as api from '../api/index';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';

const Container = styled.div`
margin: 1px 1px;
`;

const Wrapper = styled.div`
  padding: 0px 50px;
  display: flex;
  flex-direction: row;
  /* background: yellow; */
  /* align-items: center; */
  justify-content: flex-start;
`;

const TextContainer = styled.div`
  overflow: hidden;
  /* padding: 0 0 32px; */
  margin: 48px auto 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  display: flex;
  padding: 20px 20px;
  margin: 10px 10px;
  flex-direction: column;
  align-items: flex-start;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, #fff 0px 0px 0px 3px; */
  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset; */
  /* box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px; */
  
`;


const ProfileImg = styled.img`
  width: 20%;
  height: 20%;
  /* border-radius: 50%; */
  background: teal;
  padding: 5px;
  z-index: 2;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const PlainTextCont = styled.p`
font-size: 20px;
margin: 3px 3px;
padding: 3px 3px;
z-index: 1;

`; 
const Line = styled.hr`
  color: rgba(0, 0, 0, 0.65);
  margin-left: -100px;
`;
const OrderWrapper = styled.div`
background: #fff;
text-align: center;
align-items: center;
/* justify-content: center; */
margin-top: 10px;
padding-bottom: 5px;
border-radius: 20px;
`;

const SingleOrder = styled.div`
margin: 10px 10px;
border-radius: 5px;
padding: 20px 20px;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
display: flex;
flex-direction: row;
justify-content: space-between;
cursor: pointer;
`;

const Profile = ({user, setUser}) => {
  
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    const getOrdersByUserId = async () =>{
      try {
        const res = await api.getOrdersDetailsByUserId(user.existingUser._id);
        console.log(res);
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrdersByUserId();
  }, []);
  console.log(orders);

  const orderDetails = (event)=>{
    const temp = event.target.getAttribute('id');
    console.log(event.target.getAttribute('id'));
    navigate(`/orderDetails/${temp}`);
  }

  return (
    <>
    <Announcement />
    <Navbar user={user} setUser={setUser} />
    <Container>
      <Wrapper>
        <ProfileImg src="https://scontent.fdac24-2.fna.fbcdn.net/v/t1.6435-9/71498243_2445517379056677_7580054576594681856_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHm29lt_iFRlH-gwq18T6POOXAAVnX4kKE5cABWdfiQoRklUVaWbOpPq63_j8iflwYZDAKcMXLoxLyF-IfH-ePk&_nc_ohc=yCjeUYBBAgQAX-w3nTe&_nc_ht=scontent.fdac24-2.fna&oh=00_AT-wrZ11npCW8eIxNKyx4FYfXIWePvasCjoDFJouAr2UKQ&oe=632CC9A2"/>
      <TextContainer>
      <h1>Profile Details</h1>
          <PlainTextCont>First Name : {user.existingUser.firstName}</PlainTextCont>
          <PlainTextCont>Last Name : {user.existingUser.lastName}</PlainTextCont>
          <PlainTextCont>Bank Account Number : {user.existingUser.bankid}</PlainTextCont>
          <PlainTextCont>Email : {user.existingUser.email}</PlainTextCont>  
      </TextContainer>
      </Wrapper>
      <Line/>
      <h1>Orders</h1>
      <Line/>
      <OrderWrapper>
        {orders.map((item)=>(<SingleOrder key={item._id} id={item._id}  onClick={orderDetails}>
          <div>Order ID : {item._id}</div>
          <div>Transaction ID : {item.transactionId} </div>
          <div>Amount : {item.amount}</div>
          <div> {item.status}</div>
        </SingleOrder>
        ))}
      </OrderWrapper>
      
    </Container>
    </>
  )
}

export default Profile