import { useSelector } from "react-redux";
import styled from "styled-components";
import CheckoutPage from "../components/CheckoutPage/CheckoutPage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 5px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const MultiForm = styled.div`
  padding: 5px;
  width: 50%;
  /* height: 60vh; */
  justify-content: center;
  align-items: center;
`;


const Container1 = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Checkout = ({ user, setUser }) => {
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleQuantity = (type) => {
    if (type === "dec") {
      // quantity > 1 && product.quantity--;
    } else {
      // product.quantity--
    }
  };



  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Container1/>
      <Container>
        <Wrapper>
          <MultiForm>
            <CheckoutPage cart={cart} currentUser={currentUser}/>
          </MultiForm>
          <Footer />
        </Wrapper>
      </Container>
    </div>
  );
};

export default Checkout;
