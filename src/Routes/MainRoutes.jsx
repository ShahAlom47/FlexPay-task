

import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../Root/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Authentication/Register/Register";
import Login from "../Pages/Authentication/Login/Login";

import PrivetRouter from "./PrivetRouter/PrivetRouter";


import UserHome from "../DashBoard/UserHome/UserHome";
import AdminHome from "../DashBoard/AdminHome/AdminHome";
import AgentHome from "../DashBoard/AgentHome/AgentHome";
import AdminRoutes from "./AdminRoutes/AdminRoutes";
import AgentRoutes from "./AgentRoutes/AgentRoutes";
import ManageUser from "../DashBoard/AdminHome/ManageUser/ManageUser";
import CashIn from "../DashBoard/UserHome/CashIn/CashIn";
import CashInRequest from "../DashBoard/AgentHome/CashInRequest/CashInRequest";
import TransactionHistory from "../DashBoard/AgentHome/TransactionHistory/TransactionHistory";
import UserTransactionHistory from "../DashBoard/UserHome/UserTransactionHistory/UserTransactionHistory";
import CashOut from "../DashBoard/UserHome/CashOut/CashOut";
import UserSendMoney from "../DashBoard/UserHome/UserSendMoney/UserSendMoney";
import AllTransaction from "../DashBoard/AdminHome/AllTransaction/AllTransaction";





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
        path: "/userHome",
        element: <PrivetRouter><UserHome></UserHome></PrivetRouter>,
      },
      {
        path: "/userHome/cashIn",
        element: <PrivetRouter><CashIn></CashIn></PrivetRouter>,
      },
      {
        path: "/userHome/cashOut",
        element: <PrivetRouter><CashOut></CashOut></PrivetRouter>,
      },
      {
        path: "/userHome/sendMoney",
        element: <PrivetRouter><UserSendMoney></UserSendMoney></PrivetRouter>,
      },
      {
        path: "/userHome/UserTransactionHistory",
        element: <PrivetRouter><UserTransactionHistory></UserTransactionHistory></PrivetRouter>,
      },

      // agent routes
      {
        path: "/agentHome",
        element: <AgentRoutes><AgentHome></AgentHome></AgentRoutes>,
      },
      {
        path: "/agentHome/CashInRequest",
        element: <AgentRoutes><CashInRequest></CashInRequest></AgentRoutes>,
      },
      {
        path: "/agentHome/TransactionHistory",
        element: <AgentRoutes><TransactionHistory></TransactionHistory></AgentRoutes>,
      },
      {
        path: "/adminHome",
        element:<AdminRoutes> <AdminHome></AdminHome></AdminRoutes>,
      },
      {
        path: "/adminHome/manageUser",
        element:<AdminRoutes> <ManageUser></ManageUser></AdminRoutes>,
      },
      {
        path: "/adminHome/allTransaction",
        element:<AdminRoutes> <AllTransaction></AllTransaction></AdminRoutes>,
      },
    
    ]
  },
  

]);

export default router;