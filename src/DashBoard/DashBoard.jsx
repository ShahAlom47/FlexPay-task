import { FaHistory, FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useUser from "../CustomHocks/useUser";
import useUserRole from "../CustomHocks/useUserRole";
import { TbJewishStar } from "react-icons/tb";
import { MdBookmarkAdded, MdDomainAdd, MdManageAccounts, MdOutlineAssessment, MdOutlinePermDataSetting, MdOutlineSell, MdOutlineSendToMobile } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { CiSquareQuestion } from "react-icons/ci";
import { Helmet } from "react-helmet";
import { RiAdvertisementLine, RiChatSettingsLine } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { HiOutlineCash } from "react-icons/hi";






const DashBoard = () => {

    const { user } = useUser()
    const { data } = useUserRole()


    // const [isAdmin]=useAdmin()




    return (
        <div className=" lex   max-w">
            <Helmet>
                <title>HONEST || Dashboard</title>
            </Helmet>
            <div className="lg:flex-1 py- bg-gray-100">
                <Outlet></Outlet>

            </div>
            

            <div className="p-10   gap-5  bg-[#ebebea]">
               
                <div className="space-y-2  ">
                    {user && data === 'admin' ? (
                        <div className="flex gap-3 flex-wrap ">
                            <NavLink to={'/dashBoard/adminHome'}>
                                <button className="flex items-center gap-2 hoverBtn hover:text-white font-semibold">
                                    <FaHome /> Admin Profile
                                </button>
                            </NavLink>
                            <NavLink to={'/dashBoard/manageProperties'}>
                                <button className="flex items-center gap-2 hoverBtn hover:text-white font-semibold">
                                <MdOutlinePermDataSetting /> Manage Properties
                                </button>
                            </NavLink>
                            <NavLink to={'/dashBoard/manageUser'}>
                                <button className="flex items-center gap-2 hoverBtn hover:text-white font-semibold">
                                <MdManageAccounts /> Manage User
                                </button>
                            </NavLink>
                           
                            <NavLink to={'/dashBoard/manageReview'}>
                                <button className="flex items-center gap-2 hoverBtn hover:text-white font-semibold">
                                <RiChatSettingsLine /> Manage Review
                                </button>
                            </NavLink>
                            <NavLink to={'/dashBoard/advertise'}>
                                <button className="flex items-center gap-2 hoverBtn hover:text-white font-semibold">
                                <RiAdvertisementLine /> Advertise Property
                                </button>
                            </NavLink>
                        </div>
                    ) : null}

                    {user && data ==='agent'? (
                        <div className="flex gap-3 flex-wrap ">
                        <NavLink to={'/dashBoard/agentHome'}>
                            <button className="flex items-center gap-2 hoverBtn hover:text-white font-semibold">
                                <FaHome /> Agent Profile
                            </button>
                        </NavLink>
                        <NavLink to={'/dashBoard/addProperty'}>
                            <button className="flex items-center gap-2 hoverBtn hover:text-white font-semibold">
                            <MdDomainAdd/> Add Property
                            </button>
                        </NavLink>
                        <NavLink to={'/dashBoard/myAddedProperty'}>
                            <button className="flex items-center gap-2 hoverBtn hover:text-white font-semibold">
                            <MdBookmarkAdded /> My Added Property
                            </button>
                        </NavLink>
                        <NavLink to={'/dashBoard/soldProperty'}>
                            <button className="flex items-center gap-2 hoverBtn hover:text-white font-semibold">
                            <MdOutlineSell /> My Sold Property
                            </button>
                        </NavLink>
                        <NavLink to={'/dashBoard/requestedProperty'}>
                            <button className="flex items-center gap-2 hoverBtn hover:text-white font-semibold">
                            <CiSquareQuestion /> Requested Properties
                            </button>
                        </NavLink>
                        </div>
                    ) : null}

                    {user && data !== 'agent' && data !== 'admin' ? (
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
                    ) : null}

                 
                </div>


            </div>

           

        </div>
    );
};

export default DashBoard;