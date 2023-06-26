import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthProvider from "../context/AuthProvider.jsx";
import Home from "../pages/Home.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Login from "../pages/Login.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import NodeList from "../components/NodeList.jsx";
import Note from "../components/Note.jsx";

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
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
            // loader: async () => {},
            children: [
              {
                element: <NodeList />,
                path: `folders/:folderId`,
                children: [
                  {
                    element: <Note />,
                    path: `note/:noteId`,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
