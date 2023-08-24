import Header from "./components/Header";
import Dashboard from "./scenes/dashboard";
import Home from "./scenes/home";
import Login from "./scenes/login";
import Register from "./scenes/register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./scenes/profile";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route path="" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
