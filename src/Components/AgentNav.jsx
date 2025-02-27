import { Link } from 'react-router-dom';

const AgentNav = () => {
    return (
        < div className=' lg:flex-col md:flex-col flex-row flex-wrap flex gap-3'>



            <Link to={'dash/agent/cashIn'}>
                <button className=" w-full text-start px-2    shadow-black shadow-lg rounded-lg  hover:scale-95 transition-all duration-300">
                    <h1 className=" text-2xl font-bold">CashIn</h1>
                </button>
            </Link>


            <Link to={'/dash/agent/cashRequest'}>
                <button className=" w-full text-start px-2    shadow-black shadow-lg rounded-lg  hover:scale-95 transition-all duration-300">
                    <h1 className=" text-2xl font-bold">Cash Request</h1>
                </button>
            </Link>


            <Link to={'/dash/agent/withdrawRequest'}>
                <button className=" w-full text-start px-2    shadow-black shadow-lg rounded-lg  hover:scale-95 transition-all duration-300">
                    <h1 className=" text-2xl font-bold">Withdraw Request</h1>
                </button>
            </Link>
            <Link to={'/dash/agent/history'}>
                <button className=" w-full text-start px-2    shadow-black shadow-lg rounded-lg  hover:scale-95 transition-all duration-300">
                    <h1 className=" text-2xl font-bold">History</h1>
                </button>
            </Link>



        </div>
    );
};

export default AgentNav;