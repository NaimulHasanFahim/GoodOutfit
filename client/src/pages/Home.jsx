import React from "react";
import Announcement from "../components/Announcement.jsx";
import Categories from "../components/Categories.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import Newsletter from "../components/Newsletter.jsx";
import Products from "../components/Products.jsx";
import Slider from "../components/Slider.jsx";
const Home = ({user, setUser}) => {
  
  return (
    <div>
      <Announcement />
      <Navbar user={user} setUser={setUser} />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
