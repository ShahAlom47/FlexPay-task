import { Navigate, useLocation, } from "react-router-dom";
import PropTypes from "prop-types"; // ES6
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUser from "../../CustomHocks/useUser";

const PrivateRouter = ({ children, role}) => {
    const { user, loading } = useUser();
    const location = useLocation();
console.log(user?.accountType, role);


    if (loading) return <div>Loading...</div>;

    if (!user) {
        toast.info("Login required, please login first");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user?.accountType !== role) {
        toast.info("Unauthorized access");
        return <Navigate to="/" replace />;
    }

    return <>
   < ToastContainer/>
    {children}
    
    </>;
};

export default PrivateRouter;

PrivateRouter.propTypes = {
    children: PropTypes.node.isRequired,
    role: PropTypes.string,
};
