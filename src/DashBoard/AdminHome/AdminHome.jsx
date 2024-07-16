import {  FaHome } from "react-icons/fa";
import { NavLink,  } from "react-router-dom";

import {  MdManageAccounts, MdOutlinePermDataSetting } from "react-icons/md";


import { RiAdvertisementLine, RiChatSettingsLine } from "react-icons/ri";

const AdminHome = () => {
    return (
        <div>
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
        </div>
    );
};

export default AdminHome;