import { Helmet } from "react-helmet";
import UserProfileLayout from "../../SharedComponents/UserProfileLayout/UserProfileLayout";


const UserHome = () => {
    return (
        <div className="">
            
            <UserProfileLayout></UserProfileLayout>
            <div>
            <Helmet>
                <title> User Home || SCash  </title>
            </Helmet>
           
            </div>
            
        </div>
    );
};

export default UserHome;