import { Helmet } from "react-helmet";
import { FaHistory, FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BsCashCoin } from "react-icons/bs";
import { HiOutlineCash } from "react-icons/hi";
import { MdOutlineSendToMobile } from "react-icons/md";


const UserHome = () => {
    // const {user}=useUser()
    return (
        <div className="">
            
           
            <div>
            <Helmet>
                <title> User Home || SCash  </title>
            </Helmet>
           
                        <div className="flex gap-12 flex-wrap justify-center lg:justify-between md:justify-between mx-auto  min-h-screen">
                             <div><NavLink to={'/dashBoard/userHome'}>
                                <button className="flex flex-col justify-center items-center gap-2 hoverBtn hover:text-white font-semibold">
                                    <FaHome className="text-9xl" /> <h1>My Profile</h1>
                                </button>
                            </NavLink></div>
                            <div> <NavLink to={'/dashBoard/userWishList'}>
                                <button className="flex flex-col justify-center items-center gap-2 hoverBtn hover:text-white font-semibold">
                                <BsCashCoin className="text-9xl" /> <h1>Cash In</h1>
                                </button>
                            </NavLink></div>
                            <div> <NavLink to={'/dashBoard/myBoughtProperty'}>
                                <button className="flex flex-col justify-center items-center gap-2 hoverBtn hover:text-white font-semibold">
                                <HiOutlineCash className="text-9xl" /> <h1>CashOut</h1>
                                </button>
                            </NavLink></div>
                            <div> <NavLink to={'/dashBoard/myReviews'}>
                                <button className="flex flex-col justify-center items-center gap-2 hoverBtn hover:text-white font-semibold">
                                <MdOutlineSendToMobile className="text-9xl" /> <h1> Send Money</h1>
                                </button>
                            </NavLink></div>
                             <div><NavLink to={'/dashBoard/myReviews'}>
                                <button className="flex flex-col justify-center items-center gap-2 hoverBtn hover:text-white font-semibold">
                                <FaHistory className="text-9xl" /><h1>History</h1>
                                </button>
                            </NavLink></div>
                        </div>
                   

           
            </div>
            
        </div>
    );
};

export default UserHome;