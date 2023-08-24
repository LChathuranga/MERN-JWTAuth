import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../state/usersApi";
import { useNavigate } from "react-router-dom";
import { logout } from "../state";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">MERN Auth</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="align-right">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <Nav.Link href="/profile" className="me-3">{userInfo.name}</Nav.Link>
                  <Button className="btn btn-secondary" onClick={logoutHandler}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Sign In</Nav.Link>
                  <Nav.Link href="/register">Sign Up</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
