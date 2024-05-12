
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement.jsx";
import Categories from "../components/Categories.jsx";
import Footer from "../components/Footer.jsx";
import Modal from "../components/Modal.js";
import Navbar from "../components/Navbar.jsx";
import Newsletter from "../components/Newsletter.jsx";
import Products from "../components/Products.jsx";
import Slider from "../components/Slider.jsx";

const Container = styled.div`
margin: 0px 0px;
`;

const Home = ({user, setUser}) => {

  const [showModal, setShowModal] = useState(false);
  useEffect(()=>{
    
    const openModal = () => {
      setShowModal(prev => !prev);
    };
    openModal();
  }, [ user!==null && user?.bankid == ""]);

  return (
    <Container>
      <Announcement />
      <Navbar user={user} setUser={setUser} />
      {user?.bankid  ==="" ? (<Modal user={user} setUser={setUser} showModal={showModal} setShowModal={setShowModal} />) : (
        <div>
        <Slider />
        <Categories />
        <Products />
        {/* <Newsletter /> */}
        <Footer />
        </div>
      )}
      
    </Container>
  );
};

export default Home;
