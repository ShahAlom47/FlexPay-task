import { Link } from "react-router-dom";


const AdminNav = () => {
    return (
        <div  className=" flex flex-col gap-3">
            <Link to={'/dash/overview'}>
                <button className=" w-full text-start px-2    overflow-hidden shadow-black shadow-lg rounded-sm  hover:scale-95 transition-all duration-300">
                   <h1  className=" text-2xl font-bold">OverView</h1>
                </button>
            </Link>
            <Link to={'/dash/manageUser'}>
                <button className=" w-full text-start px-2    shadow-black shadow-lg rounded-lg  hover:scale-95 transition-all duration-300">
                   <h1  className=" text-2xl font-bold">Manage User</h1>
                </button>
            </Link>
            <Link to={'/dash/cashRequest'}>
                <button className=" w-full text-start px-2    shadow-black shadow-lg rounded-lg  hover:scale-95 transition-all duration-300">
                   <h1  className=" text-2xl font-bold">Cash Request</h1>
                </button>
            </Link>
            <Link to={'/dash/withdrawRequest'}>
                <button className=" w-full text-start px-2    shadow-black shadow-lg rounded-lg  hover:scale-95 transition-all duration-300">
                   <h1  className=" text-2xl font-bold">Withdraw Request</h1>
                </button>
            </Link>

           


        </div>
    );
};

export default AdminNav;