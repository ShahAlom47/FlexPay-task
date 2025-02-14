import { Link } from "react-router-dom";
import sendMony from '../assets/features/send-money.png'
import cashOut from '../assets/features/cashOut.png'


const UserNav = () => {

    return (
        <div className=" p-3 flex  flex-col gap-4">

            <Link to={'/dash/sendMoney'}>
                <button  className=" w-full max-h- overflow-hidden shadow-black shadow-lg rounded-lg  hover:scale-95 transition-all duration-300">
                    <img className=" w-full rounded-xl " src={sendMony} alt=" send mony logo" />
                </button>
            </Link>

            <Link to={'/dash/cashOut'}>
                <button  className=" w-full max-h- overflow-hidden shadow-black shadow-lg rounded-lg  hover:scale-95 transition-all duration-300">
                    <img className=" w-full  rounded-xl" src={cashOut} alt=" cash out  logo" />
                </button>
            </Link>

            user nav
        </div>
    );
};

export default UserNav;