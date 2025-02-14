
import { useState } from "react";
import useUser from "../../CustomHocks/useUser";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import UserProfileDrawer from "../../Components/UserProfileDrawer";


const UserProfile = () => {
    const { user } = useUser();
    const [showBalance, setShowBalance] = useState(false)

    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }


    return (
        <div className=" flex   bg-purple-700 p-2  ">

            <div className="flex justify-between items-center gap-2 w-full px-4">


                <div onClick={toggleDrawer} className=" w-12 h-12 cursor-pointer  ">
                    <img className="w-full h-full rounded-full border-2 border-black" src={user?.photoURL || 'https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png'} alt="" />
                </div>

                {/* Name And Balance  */}

                <div className="text-white border-y-2 px-3">
                    <h1 className="text-2xl font-semibold">
                        <span className="font-medium">{user?.name || "User Name"}</span>
                    </h1>
                    <h1
                        onClick={() => setShowBalance(!showBalance)}
                        className="flex gap-3 items-center cursor-pointer font-semibold"
                    >
                        Balance:
                        <span
                            className={`font-medium transition-all ${showBalance ? "text-white" : "blur-sm"
                                }`}
                        >
                            {user?.balance || 0} TK
                        </span>
                        <FiEye className={`${showBalance ? "hidden" : "block"}`} />
                        <FiEyeOff className={`${showBalance ? "block" : "hidden"}`} />
                    </h1>
                </div>


                <div className=" gap-6 items-center text-white hover:bg-slate-400 px-3 py-1 rounded-lg bg-opacity-50 hover:text-black">
                    <button>Logout</button>
                </div>

            </div>

            {/* drawer content  */}

            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                className='bla bla bla'
                size={350}
            >
                <UserProfileDrawer></UserProfileDrawer>
            </Drawer>

        </div>
    );
};

export default UserProfile;