import React from 'react';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';

const Container = styled.div`
margin: 1px 1px;
`;



const OrderDetails = ({user, setUser}) => {
  return (
    <>
    <Announcement/>
    <Navbar user={user} setUser={setUser}/>
    </>
  )
}

export default OrderDetails