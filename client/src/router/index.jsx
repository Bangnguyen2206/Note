import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthProvider from "../context/AuthProvider.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";

const ErrorBoundaryLayout = () => (
  <>
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  </>
);

export const AppRoutes = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
