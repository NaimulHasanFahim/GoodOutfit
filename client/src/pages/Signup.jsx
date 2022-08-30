import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signup } from "../actions/auth";
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  /* background: linear-gradient( */
  /* rgba(255, 255, 255, 0.5), */
  /* rgba(255, 255, 255, 0.5) */
  /* ), */
  /* url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") */
  /* center; */
  background-size: cover;
  /* background-color: #276749; */
  background-color: #285e61;
  display: flex;
  flex-direction: column;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #285e61;
  color: white;
  cursor: pointer;
`;
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
  bankid: "",
  bankpass: "",
};

const Signup = ({user, setUser}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(signup(formData, navigate));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Navbar user={user} setUser={setUser}/>
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              name="firstName"
              onChange={handleChange}
              placeholder="First name"
            />
            <Input
              name="lastName"
              onChange={handleChange}
              placeholder="Last name"
            />
            <Input
              name="username"
              onChange={handleChange}
              placeholder="Username"
            />
            <Input name="email" onChange={handleChange} placeholder="Email" />
            <Input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
            />
            <Input
              name="confirmPassword"
              onChange={handleChange}
              type="password"
              placeholder="Confirm password"
            />
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button type="submit">CREATE</Button>
          </Form>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Signup;
