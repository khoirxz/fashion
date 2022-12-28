import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyUser } from "../features/authSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyUser());
  }, [dispatch]);

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default ProtectedRoute;
