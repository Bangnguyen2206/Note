/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  if (!localStorage.getItem("accessToken")) {
    navigate("/login");
    return;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
