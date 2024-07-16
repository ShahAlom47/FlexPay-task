

import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../Root/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Authentication/Register/Register";
import Login from "../Pages/Authentication/Login/Login";

import PrivetRouter from "./PrivetRouter/PrivetRouter";

import DashBoard from "../DashBoard/DashBoard";
import UserHome from "../DashBoard/UserHome/UserHome";
import AdminHome from "../DashBoard/AdminHome/AdminHome";
import AgentHome from "../DashBoard/AgentHome/AgentHome";
import AdminRoutes from "./AdminRoutes/AdminRoutes";
import AgentRoutes from "./AgentRoutes/AgentRoutes";





const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
     
      {
        path: "/user-home",
        element: <PrivetRouter><UserHome></UserHome></PrivetRouter>,
      },
    
    ]
  },
  {
    path: "/dashBoard",
    element: <PrivetRouter><DashBoard></DashBoard></PrivetRouter>,
    errorElement: <ErrorPage />,
    children: [
      // user routes

      {
        path: "/dashBoard/userHome",
        element: <PrivetRouter><UserHome></UserHome></PrivetRouter>,
      },
     



      // admin routes 

      {
        path: "/dashBoard/adminHome",
        element:<AdminRoutes> <AdminHome></AdminHome></AdminRoutes>,
      },
    
  


      //   agent route

      {
        path: "/dashBoard/agentHome",
        element: <AgentRoutes><AgentHome></AgentHome></AgentRoutes>,
      },
      {
        path: "/dashBoard/addProperty",
        element: <AgentRoutes></AgentRoutes>,
      },
     


    ]

  },

]);

export default router;