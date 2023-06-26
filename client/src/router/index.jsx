import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthProvider from "../context/AuthProvider.jsx";
import Home from "../pages/Home.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Login from "../pages/Login.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import NodeList from "../components/NodeList.jsx";
import Note from "../components/Note.jsx";
import { noteLoader, notesLoader } from "../utils/noteUtils.js";
import { foldersLoader } from "../utils/folderUtils.js";

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
            loader: foldersLoader,
            children: [
              {
                element: <NodeList />,
                path: `folders/:folderId`,
                loader: notesLoader,
                children: [
                  {
                    element: <Note />,
                    path: `note/:noteId`,
                    loader: noteLoader,
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
