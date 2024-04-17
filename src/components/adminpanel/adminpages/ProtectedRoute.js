import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const role = window.localStorage.getItem("role");

    if (role === 'admin') {      
      setIsLoggedIn(true);
    } 
    else {
      navigate("/login");
    }
  }, [navigate]); 

  return isLoggedIn ? children : null;
};

export default ProtectedRoute;