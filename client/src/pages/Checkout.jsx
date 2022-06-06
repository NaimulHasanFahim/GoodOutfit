import { useSelector } from "react-redux";
import styled from "styled-components";
import CheckoutPage from "../components/CheckoutPage/CheckoutPage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const Container = styled.div`
position: relative ;
display: flex;
flex-direction: column;
justify-content: center ;
align-items: center ;
  `;


const Wrapper = styled.div`
  padding: 5px;
  width: 50%;
  height: 40%;
  justify-content: center ;
  align-items: center ;
  

`;

const Checkout = () => {
  const cart = useSelector((state) => state.cart);

  const handleQuantity = (type) => {
    if (type === "dec") {
      console.log("Decreasing");
      // quantity > 1 && product.quantity--;
    } else {
      // product.quantity--
      console.log("Increasing");
    }
  };

  return (
    <div>
      <Navbar />
    
    <Container>
      <Wrapper>
        <CheckoutPage/>
      </Wrapper>
      <Footer />
    </Container>
    </div>
  );
};

export default Checkout;
