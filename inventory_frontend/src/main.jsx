/* eslint-disable react/prop-types */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate
} from "react-router-dom";
import './index.css'
import Supplier from './Supplier';
import Navbar from './navbar';
import Login from './Login';
let isLogin = localStorage.getItem('loginin') === 'true' ? true : false;
export function PrivateRoute({ children }) {


  console.log(isLogin);
  let isAuthenticated = isLogin;
  let navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute> <App /> </PrivateRoute>,
  },
  {
    path: "/product",
    element: <PrivateRoute> <App /> </PrivateRoute>,
  },

  {
    path: "/supplier",
    element: <PrivateRoute> <Supplier /> </PrivateRoute>
  },
  {
    path: "/login",
    element: <Login />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {
      isLogin ? <Navbar /> : null
    }
    <RouterProvider router={router} />
  </React.StrictMode>,
)
