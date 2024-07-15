

import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useUser from "../../CustomHocks/useUser";
import useUserRole from "../../CustomHocks/useUserRole";
import LoadingRing from "../../SharedComponents/LoadingRing/LoadingRing";


const AdminRoutes = ({children}) => {
    const {user,loading}=useUser()
    const {data,isPending}=useUserRole()
    const location=useLocation()

  

    if (loading||isPending) {
        return <LoadingRing></LoadingRing>
    }

    if (user&& data==='admin') {
        return (
            <div>
                {children}
            </div>
        )
    }

        return <Navigate state={location.pathname} to={'/'} replace></Navigate>
    

};

export default AdminRoutes;
AdminRoutes.propTypes = {
    children: PropTypes.node.isRequired
};