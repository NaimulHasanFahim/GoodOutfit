import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { signin } from "../actions/auth";
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #22543d;
  /* background: linear-gradient( */
  /* rgba(255, 255, 255, 0.5), */
  /* rgba(255, 255, 255, 0.5) */
  /* ), */
  /* url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") */
  /* center; */
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #22543d;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: black;
`;
const initialState = { password: "", email: "" };

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Hello")
    console.log(formData);
    dispatch(signin(formData));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form onSubmit={handleSubmit}>
            <Input name="email" onChange={handleChange} placeholder="Email" />
            <Input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
            />
            <Button type="submit">LOGIN</Button>
            <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>

            <Link href="/signup">CREATE A NEW ACCOUNT</Link>
          </Form>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Login;
