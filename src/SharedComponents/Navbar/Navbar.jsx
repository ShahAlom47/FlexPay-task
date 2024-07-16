

import { IoMoon } from "react-icons/io5";
import { MdDashboard, MdSunny } from "react-icons/md";
import {  NavLink, useNavigate } from "react-router-dom";
import useTheme from "../../CustomHocks/useTheme";
import { LuLogOut } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CiLogin } from "react-icons/ci";
import{ AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext } from "react";
import UserProfile from "../UserProfile/UserProfile";
import { GiHamburgerMenu } from "react-icons/gi";



const Navbar = () => {
const navigate=useNavigate()
    const [themeData, handelTheme] = useTheme()
    const { user,  logout } = useContext(AuthContext)
console.log(user);

 

    const handelLogOut = () => {
        logout()
        navigate('/')
            if(!user){
                toast.success('Logout Completed', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                   
                    });
                 

            }
    }



 
    const dashNav = <>


        {user && user?.role ==='agent' ? (<NavLink to={'/agentHome'}><li className="border-b-2 flex flex-row items-center"> <span><MdDashboard /></span> My Service</li></NavLink>) : null}

        {user && user?.role==='admin' ? (<NavLink to={'/adminHome'}><li className="border-b-2 flex flex-row items-center"> <span><MdDashboard /></span> My Service</li></NavLink>) : null}

        {user && user?.role === 'pending' || user?.role !== 'user' && user?.role!=='admin' && user?.role !=='agent' ? (<NavLink to={'/userHome'}><li className="border-b-2 flex flex-row items-center"> <span><MdDashboard /></span> My Servicett</li></NavLink>) : null}


    </>
    return (
       
           
            <nav className=" bg-[#fbf1f8] bg-opacity-25 z-[9999]">
                 <ToastContainer></ToastContainer>
                <div className="navbar z-50 top-0 flex    max-w border-b-2">
                    <div className="navbar-start w-10/12">
                    {
                        user?<UserProfile></UserProfile>: 
                        <div className="mb-5   ">
                        <h1 className="text-5xl font-bold"><span className="text-red-500 l">S</span>Cash</h1>
                       
                    </div>
                    }
                    </div>
                    <div className="navbar-end  flex-1 lg:flex">
                      

                        <button onClick={handelTheme} className=" text-xl hover:bg-[#00000049] mx-2 p-2 rounded-full" title="Theme">{themeData === 'light' ? <MdSunny /> : <IoMoon />}</button>
                        {
                            user ? <div className=" dropdown dropdown-hover  dropdown-end">
                                <div className="btn btn-ghost btn-circle avatar text-3xl">
                                <GiHamburgerMenu />
                             
                                </div>
                                <ul tabIndex={0} className="mt-0 pt-3 z-[1] p-2 shadow-lg shadow-[#8355b8] menu menu-sm dropdown-content bg-base-100 rounded-sm w-60">
                                    <p className=" text-center underline font-bold bg-[#8d3ad1e3] text-white py-2 uppercase">{user?.displayName}</p>
                                    {
                                        dashNav
                                    }
                                    <li onClick={handelLogOut} className=" border-b-2 flex flex-row items-center ">  <span><LuLogOut /></span>Logout</li>

                                </ul>
                            </div> :
                                <ul className="flex">
                                    <NavLink to={'/login'}><li className=" flex items-center gap-2 font-medium"><CiLogin /> Login</li></NavLink>
                                </ul>
                        }

                    </div>

                </div>
            </nav>
       
    );
};

export default Navbar;