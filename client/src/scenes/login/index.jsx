import { Button, Card, Form, FormGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../state/usersApi";
import { setCredentials } from "../../state";
import {toast} from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({...res}));
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  return (
    <>
      <Form onSubmit={submitHandler}>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "calc(100vh - 60px)" }}
        >
          <Card style={{ width: "38rem" }} className="p-4">
            <h1 className="text-center my-3">LOGIN</h1>
            <FormGroup className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" variant="primary" className="mt-3">
              Sign In
            </Button>
            <div className="py-3">
              New customer <Link to="/register">Register</Link>
            </div>
          </Card>
        </div>
      </Form>
    </>
  );
};

export default Login;
