
import React from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement.jsx";
import Categories from "../components/Categories.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import Newsletter from "../components/Newsletter.jsx";
import Products from "../components/Products.jsx";
import Slider from "../components/Slider.jsx";

const Container = styled.div`
margin: 0px 0px;
`;

const Home = ({user, setUser}) => {
  
  return (
    <Container>
      <Announcement />
      <Navbar user={user} setUser={setUser} />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Home;
