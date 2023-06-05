import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  let auth;

  if (localStorage.getItem("isAuth") === "true") {
    auth = true;
  } else {
    auth = false;
  }

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
