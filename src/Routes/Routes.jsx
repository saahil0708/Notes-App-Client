import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout/Layout";
import HomePage from "../Pages/Home";
import Features from "../Pages/Features";
import ContactPage from "../Pages/Contact";
import DashboardPage from "../Pages/Dashboard";
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/features",
                element: <Features />,
            },
            {
                path: "/contact",
                element: <ContactPage />,
            },
            {
                path: "/dashboard",
                element: (
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                ),
            }
        ]
    }
])

export default function Routes() {
    return (
        <RouterProvider router={router} />
    )
}