import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Register from "../Pages/Authentication/Register/Register";
import Login from "../Pages/Authentication/Login/Login";
import SendMoney from "../Pages/SendMoney/SendMoney";
import CashOut from "../Pages/CashOut/CashOut";
import PrivetRouter from "./PrivetRouter/PrivetRouter";
import DashBoard from "../DashBoard/DashBoard";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import AgentRoutes from "./AgentRoutes/AgentRoutes";
import CashIn from "../Pages/CashIn/CashIn";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute />, 
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
      <PrivetRouter>
        <DashBoard />
      </PrivetRouter>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dash/sendMoney",
        element: (
          <PrivetRouter role="user">
            <SendMoney />
          </PrivetRouter>
        ),
      },
      {
        path: "/dash/cashOut",
        element: (
          <PrivetRouter role="user">
            <CashOut />
          </PrivetRouter>
        ),
      },
      // agent route 
      {
        path: "/dash/cashIn",
        element: (
          <AgentRoutes>
            <CashIn></CashIn>
          </AgentRoutes>
          
        ),
      },
      // admin route 
      {
        path: "/dash/admin",
        element: (
          <PrivetRouter role="admin">
            <div> Admin </div>
          </PrivetRouter>
        ),
      },
    
    ],
  },
]);

export default router;
