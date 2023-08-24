import { Button, Card, Form, FormGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useUpdateProfileMutation,
} from "../../state/usersApi";
import { toast } from "react-toastify";
import { setCredentials } from "../../state";

const Profile = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [conformPassword, setConformPassword] = useState();
  const [password, setPassword] = useState();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.setName, userInfo.setEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== conformPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated')
      } catch (error) {
        toast.error(error?.data?.message || error.err);
      }
    }
  };
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "calc(100vh - 60px)" }}
      >
        <Card style={{ width: "38rem" }} className="p-4">
          <h1 className="text-center my-3">Update Profile</h1>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <FormGroup className="my-2" controlId="conformPassword">
              <Form.Label>Conform Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Conform password"
                value={conformPassword}
                onChange={(e) => setConformPassword(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Profile;
