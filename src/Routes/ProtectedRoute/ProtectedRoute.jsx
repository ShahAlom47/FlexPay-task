import { Navigate } from "react-router-dom";
import useUser from "../../CustomHocks/useUser";


const ProtectedRoute = () => {
    const { user } = useUser();
    console.log(user);
  
  
    return user ? <Navigate to="/dash" replace /> : <Navigate to="/login" replace />;
  };

  export default ProtectedRoute