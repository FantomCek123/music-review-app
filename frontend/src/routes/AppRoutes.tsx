import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import CreateAlbum from "../pages/CreateAlbum";

const AppRoutes = () => {
  //const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/create-album" element={<CreateAlbum />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home/>} 
          //element={<Home />} 
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
