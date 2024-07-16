
import Headroom from "react-headroom";
import { IoMoon } from "react-icons/io5";
import { MdDashboard, MdSunny } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import useTheme from "../../CustomHocks/useTheme";
import useUser from "../../CustomHocks/useUser";
import { LuLogOut } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CiLogin } from "react-icons/ci";
import { useEffect, useState } from "react";
import useAxios from "../../CustomHocks/useAxios";



const Navbar = () => {

    const [themeData, handelTheme] = useTheme()
    const { user,  logout } = useUser()
    const axiosSecure = useAxios()
    const [data, setData] = useState(null)
  
   
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (user && token) {
            axiosSecure.get(`/user/role/${user.email}`)
                .then((res) => {
                    setData(res.data.userRole || 'user');
                   
                })
                
        }
    }, [user, axiosSecure]);


 

    const handelLogOut = () => {
        logout()
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


        {user && data ==='agent' ? (<NavLink to={'/dashBoard/agentHome'}><li className="border-b-2 flex flex-row items-center"> <span><MdDashboard /></span> DashBoard</li></NavLink>) : null}

        {user && data ==='admin' ? (<NavLink to={'/dashBoard/adminHome'}><li className="border-b-2 flex flex-row items-center"> <span><MdDashboard /></span> DashBoard</li></NavLink>) : null}

        {user && data !== 'agent' && data !== 'admin' ? (<NavLink to={'/dashBoard/userHome'}><li className="border-b-2 flex flex-row items-center"> <span><MdDashboard /></span> DashBoard</li></NavLink>) : null}


    </>
    return (
        <Headroom className="z-[9999] sticky">
            <ToastContainer></ToastContainer>
            <nav className=" bg-[#ffffff] z-[9999]">
                <div className="navbar z-50 top-0 flex    max-w border-b-2">
                    <div className="navbar-start w-4/12">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {}
                            </ul>
                        </div>
                        <Link to={'/'} className="w-20 h-10   px-0 flex items-center overflow-hidden text-2xl font-bold"><h1><span className="text-red-500">S</span>Cash</h1></Link>
                    </div>
                    <div className="navbar-end  flex-1 lg:flex">
                      

                        <button onClick={handelTheme} className=" text-xl hover:bg-[#00000049] mx-2 p-2 rounded-full" title="Theme">{themeData === 'light' ? <MdSunny /> : <IoMoon />}</button>
                        {
                            user ? <div className=" dropdown dropdown-hover  dropdown-end">
                                <div className="btn btn-ghost btn-circle avatar">
                                    <div role="button" tabIndex={0} className=" w-10 rounded-full border-2 border-[#8d3ad1e3] flex flex-row justify-center items-center">
                                        {
                                            user?.photoURL ? <img alt="user" src={user?.photoURL} /> :
                                                <img alt="user" src='https://i.ibb.co/kMcSvFW/user.webp' />
                                        }

                                    </div>
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
                                    {/* <NavLink to={'/register'}><li className=" flex items-center gap-2"><AiOutlineUserAdd /> Register</li></NavLink> */}
                                </ul>
                        }

                    </div>

                </div>
            </nav>
        </Headroom>
    );
};

export default Navbar;