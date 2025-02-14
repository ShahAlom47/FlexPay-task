
import { useState } from "react";
import useUser from "../../CustomHocks/useUser";
import { FiEyeOff } from "react-icons/fi";


const UserProfile = () => {
    const { user } = useUser();
    const [showBalance, setShowBalance] = useState(false)




    return (
        <div className=" flex   bg-purple-700 p-2  ">

                <div className="flex justify-between items-center gap-2 w-full px-4">


                    <div className=" w-12 h-12 ">
                        <img className="w-full h-full rounded-full border-2 border-black" src={user?.photoURL} alt="" />
                    </div>

                    <div>
                        <h1 className=" text-xl font-semibold"> <span className="font-medium ">{user?.name || 'User Name'}</span></h1>
                        <h1 onClick={() => setShowBalance(!showBalance)} className=" flex gap-3  items-center cursor-pointer font-semibold">Balance:{showBalance ? <span className="font-medium ">{user?.balance || 0} TK</span> : <FiEyeOff />}</h1>
                    </div>

                    <div className=" gap-6 items-center">
                        <button>Logout</button>
                    </div>

                </div>

        </div>
    );
};

export default UserProfile;