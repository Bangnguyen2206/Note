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
            loader: async () => {
              const query = `query Folders {
                folders {
                  id
                  name
                  createdAt
                }
              }`;
              const res = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  query,
                }),
              });
              const { data } = await res.json();
              return data;
            },
            children: [
              {
                element: <NodeList />,
                path: `folders/:folderId`,
                loader: async ({ params: { folderId } }) => {
                  const query = `query Folder($folderId: String) {
                    folder(folderId: $folderId) {
                      id
                      name
                      notes{
                        id
                        content
                      }
                    }
                  }`;
                  const res = await fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                    body: JSON.stringify({
                      query,
                      variables: {
                        folderId,
                      },
                    }),
                  });
                  const { data } = await res.json();
                  return data;
                },
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
