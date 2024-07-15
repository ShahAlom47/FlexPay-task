import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useUser from "../CustomHocks/useUser";
import useUserRole from "../CustomHocks/useUserRole";
import { TbJewishStar } from "react-icons/tb";
import { MdBookmarkAdded, MdDomainAdd, MdManageAccounts, MdOutlineAssessment, MdOutlinePermDataSetting, MdOutlineSell } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { CiSquareQuestion } from "react-icons/ci";
import { Helmet } from "react-helmet";
import { RiAdvertisementLine, RiChatSettingsLine } from "react-icons/ri";






const DashBoard = () => {

    const { user } = useUser()
    const { data } = useUserRole()


    // const [isAdmin]=useAdmin()




    return (
        <div className=" lg:flex   max-w">
            <Helmet>
                <title>HONEST || Dashboard</title>
            </Helmet>
            

            <div className="p-10 lg:w-3/12 lg:min-h-screen  bg-[#997743]">
                <div className="mb-5  border-b-2 border-gray-700  ">
                    <h1 className="text-2xl font-bold">HONEST</h1>
                    <p className="font-semibold  ">Real Estate</p>
                </div>
                <div className="space-y-2  ">
                    {user && data === 'admin' ? (
                        <div className="flex gap-3 flex-wrap lg:flex-col">
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
                        <div className="flex gap-3 flex-wrap lg:flex-col">
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
                        <div className="flex gap-3 flex-wrap lg:flex-col">
                            <NavLink to={'/dashBoard/userHome'}>
                                <button className="flex items-center gap-2 hoverBtn hover:text-white font-semibold">
                                    <FaHome /> My Profile
                                </button>
                            </NavLink>
                            <NavLink to={'/dashBoard/userWishList'}>
                                <button className="flex items-center gap-2 hoverBtn hover:text-white font-semibold">
                                    <TbJewishStar /> WishList
                                </button>
                            </NavLink>
                            <NavLink to={'/dashBoard/myBoughtProperty'}>
                                <button className="flex items-center gap-2 hoverBtn hover:text-white font-semibold">
                                    <MdOutlineAssessment /> Property Bought
                                </button>
                            </NavLink>
                            <NavLink to={'/dashBoard/myReviews'}>
                                <button className="flex items-center gap-2 hoverBtn hover:text-white font-semibold">
                                    <VscPreview /> My Reviews.
                                </button>
                            </NavLink>
                        </div>
                    ) : null}

                    <hr />

                    <div className="">

                        <NavLink to={'/'}>
                            <button className="flex items-center gap-2 hoverBtn hover:text-white font-semibold mt-5">
                                <FaHome /> Home
                            </button>
                        </NavLink>
                    </div>
                </div>


            </div>

            <div className="lg:flex-1 py- bg-gray-100">
                <Outlet></Outlet>

            </div>

        </div>
    );
};

export default DashBoard;