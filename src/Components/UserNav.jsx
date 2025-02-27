import { Link } from "react-router-dom";
import sendMony from '../assets/features/send-money.png'
import cashOut from '../assets/features/cashOut.png'
import history from '../assets/features/history-btn.png'


const UserNav = () => {

    return (
        <>

            <Link to={'/dash/sendMoney'}>
                <button  className="    overflow-hidden shadow-black shadow-lg rounded-lg  hover:scale-95 transition-all duration-300">
                    <img className="   rounded-xl  object-cover " src={sendMony} alt=" send mony logo" />
                </button>
            </Link>

            <Link to={'/dash/cashOut'}>
                <button  className="   overflow-hidden shadow-black shadow-lg rounded-lg  hover:scale-95 transition-all duration-300">
                    <img className="rounded-xl" src={cashOut} alt=" cash out  logo" />
                </button>
            </Link>
            <Link to={'/dash/history'}>
                <button  className="   overflow-hidden shadow-black shadow-lg rounded-lg  hover:scale-95 transition-all duration-300">
                    <img className="rounded-xl w-full " src={history} alt=" cash out  logo" />
                </button>
            </Link>

           
            </>
    );
};

export default UserNav;