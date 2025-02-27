import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Register from "../Pages/Authentication/Register/Register";
import Login from "../Pages/Authentication/Login/Login";
import SendMoney from "../Pages/SendMoney/SendMoney";
import CashOut from "../Pages/CashOut/CashOut";
import DashBoard from "../DashBoard/DashBoard";
import CashIn from "../Pages/CashIn/CashIn";
import Home from "../Pages/Home/Home";
import UserHistory from "../Pages/UserHistory/UserHistory";
import OverView from "../Pages/OverView/OverView";
import ManageUser from "../Pages/ManageUser/ManageUser";
import CashRequest from "../Pages/CashRequest/CashRequest";
import WithdrawRequest from "../Pages/WithdrawRequest/WithdrawRequest";
import PrivateRouter from "./PrivetRouter/PrivetRouter"
import AgentCashRequest from "../Pages/AgentCashRequest/AgentCashRequest";
import AgentWithdrawRequest from "../Pages/AgentWithdrawRequest/AgentWithdrawRequest";
import AgentHistory from "../Pages/AgentHistory/AgentHistory";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        // element: <ProtectedRoute />, 
        element: <Home/>, 
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  {
    path: "/dash",
    element: (
      // <PrivateRouter role={'User'} >
        <DashBoard />
      // </PrivateRouter>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dash/sendMoney",
        element: (
          <PrivateRouter role="User">
            <SendMoney />
          </PrivateRouter>
        ),
      },
      {
        path: "/dash/cashOut",
        element: (
          <PrivateRouter role="User">
            <CashOut />
          </PrivateRouter>
        ),
      },
      {
        path: "/dash/history",
        element: (
          <PrivateRouter role="User">
            <UserHistory></UserHistory>
          </PrivateRouter>
        ),
      },



      // agent route 
      {
        path: "/dash/agent/cashIn",
        element: (
          <PrivateRouter role={"Agent"}>
            <CashIn></CashIn>
        
            </PrivateRouter>
        ),
      },
      {
        path: "/dash/agent/cashRequest",
        element: (
          <PrivateRouter role={"Agent"}>
            <AgentCashRequest></AgentCashRequest>
        
            </PrivateRouter>
        ),
      },
      {
        path: "/dash/agent/cashRequest",
        element: (
          <PrivateRouter role={"Agent"}>
            <AgentCashRequest></AgentCashRequest>
        
            </PrivateRouter>
        ),
      },
      {
        path: "/dash/agent/withdrawRequest",
        element: (
          <PrivateRouter role={"Agent"}>
            <AgentWithdrawRequest></AgentWithdrawRequest>
        
            </PrivateRouter>
        ),
      },
      {
        path: "/dash/agent/history",
        element: (
          <PrivateRouter role={"Agent"}>
            <AgentHistory></AgentHistory>
        
            </PrivateRouter>
        ),
      },





      // admin route 
      {
        path: "/dash/overview",
        element: (
          <PrivateRouter role="Admin">
           <OverView></OverView>
          </PrivateRouter>
        ),
      },
      {
        path: "/dash/manageUser",
        element: (
          <PrivateRouter role="Admin">
           <ManageUser></ManageUser>
          </PrivateRouter>
        ),
      },
      {
        path: "/dash/cashRequest",
        element: (
          <PrivateRouter role="Admin">
           <CashRequest></CashRequest>
          </PrivateRouter>
        ),
      },
      {
        path: "/dash/withdrawRequest",
        element: (
          <PrivateRouter role="Admin">
           <WithdrawRequest></WithdrawRequest>
          </PrivateRouter>
        ),
      },
    
    ],
  },
]);

export default router;
