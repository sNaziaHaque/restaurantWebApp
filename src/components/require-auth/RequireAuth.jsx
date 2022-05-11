import { useContext, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  const { setAuth } = useContext(AuthContext);

  const { auth } = useAuth();

  const location = useLocation();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      const { user } = JSON.parse(loggedInUser);
      
      setAuth({ user });
    }
  }, []);

  return auth?.user || localStorage.getItem("user") !== null ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/home" state={{ from: location }} replace />
  );
};

export default RequireAuth;
