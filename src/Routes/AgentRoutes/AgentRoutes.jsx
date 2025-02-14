import { Navigate, useLocation } from "react-router-dom";
import useUser from "../../CustomHocks/useUser";
import PropTypes from 'prop-types';
import LoadingRing from "../../SharedComponents/LoadingRing/LoadingRing";

const AgentRoutes = ({children}) => {
    const {user,loading}=useUser()
    const location=useLocation()

   

    if (loading) {
        return <LoadingRing></LoadingRing>
    }

    if (user&& user.accountType==='agent') {
        return (
            <div>
                {children}
            </div>
        )
    }

        return <Navigate state={location.pathname} to={'/'} replace></Navigate>
    

};

export default AgentRoutes;
AgentRoutes.propTypes = {
    children: PropTypes.node.isRequired
};