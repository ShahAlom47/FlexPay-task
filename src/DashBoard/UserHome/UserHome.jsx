import { Helmet } from "react-helmet";
import UserProfileLayout from "../../SharedComponents/UserProfileLayout/UserProfileLayout";


const UserHome = () => {
    return (
        <div className="">
            
            <UserProfileLayout></UserProfileLayout>
            <div>
            <Helmet>
                <title>HONEST || Dashboard || User Home </title>
            </Helmet>
            <div className=" flex flex-col items-center justify-center lg:p-10 md:p-6 p-3 lg:pl-3 ">
               <div className=" w-full space-y-3">
               <div className=" bg-slate-300 rounded-r-full w-full p-3 pr-5 font-semibold "> Reviews: <span className="font-medium">120</span> </div>
               <div className=" bg-slate-300 rounded-r-full w-full p-3 pr-5 font-semibold "> Reviews: <span className="font-medium">120</span> </div>
               <div className=" bg-slate-300 rounded-r-full w-full p-3 pr-5 font-semibold "> Reviews: <span className="font-medium">120</span> </div>
               <div className=" bg-slate-300 rounded-r-full w-full p-3 pr-5 font-semibold "> Reviews: <span className="font-medium">120</span> </div>
                
               </div>

            </div>
            </div>
            
        </div>
    );
};

export default UserHome;