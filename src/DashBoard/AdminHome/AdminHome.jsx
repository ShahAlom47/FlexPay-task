import { FaUsersCog } from "react-icons/fa";
import { NavLink, } from "react-router-dom";
import transaction from "../../assets/Logo/transaction.png"
import PendingPage from "../../SharedComponents/PendingPage/PendingPage";
import useUser from "../../CustomHocks/useUser";


const AdminHome = () => {
    const { user } = useUser();
    return (
        <div>
            {user?.role === 'admin' ?
                <div className="flex gap-12 flex-wrap justify-center lg:justify-around md:justify-around mx-auto  min-h-screen">
                    <div><NavLink to={'/adminHome/manageUser'}>
                        <button className="flex flex-col justify-center items-center gap-2 hoverBtn hover:border-2 border-black p-2 rounded-md font-semibold">
                            <FaUsersCog className="text-9xl" /> <h1>Manage User</h1>
                        </button>
                    </NavLink></div>
                    <div> <NavLink to={'/dashBoard/userWishList'}>
                        <button className="flex flex-col justify-center items-center gap-2 hoverBtn hover:border-2 border-black p-2 rounded-md font-semibold">
                            <img src={transaction} alt="" /> <h1>ALL Transaction</h1>
                        </button>
                    </NavLink></div>

                </div> : <PendingPage></PendingPage>}
        </div>
    );
};

export default AdminHome;