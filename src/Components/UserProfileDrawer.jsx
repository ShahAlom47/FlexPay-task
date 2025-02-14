import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { GrTransaction } from "react-icons/gr";


const UserProfileDrawer = () => {
    return (
        <div className=" flex flex-col gap-2 justify-between h-[100%]">
            <div className="flex-1  ">
                <h1 className=" text-3xl  font-bold bg-purple-700 text-black text-center  px-3 py-4"> Overview </h1>

                <div className="p-5">
                    <Link><button className=" flex items-center gap-3 text-black text-xl font-semibold border-purple-700 hover:border-b-2 w-full "><GrTransaction className=" bg-purple-700 p-1 rounded-full text-lg text-white" /> My Transactions</button> </Link>

                </div>

            </div>
            <div className="border-t-2 border-black bg-purple-700 flex  justify-between items-center  p-3 pb-[5%]">
                <button className="  text-white hover:bg-slate-400 px-3 py-1 rounded-lg bg-opacity-50 hover:text-black" >Logout</button>
                <button className=" text-3xl text-black hover:text-white"> <CiSettings></CiSettings></button>


            </div>

        </div>
    );
};

export default UserProfileDrawer;