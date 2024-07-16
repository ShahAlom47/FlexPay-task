import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { MdBookmarkAdded, MdDomainAdd, MdOutlineSell } from "react-icons/md";

import { CiSquareQuestion } from "react-icons/ci";
import { Helmet } from "react-helmet";


const AgentHome = () => {
    return (
        <div className=" bg-yellow-50 lg:min-h-screen">
           <Helmet>
                <title>HONEST || Dashboard || Agent Home </title>
            </Helmet>
          
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
            
        </div>
    );
};

export default AgentHome;