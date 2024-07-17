import { FaHistory } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BsCashCoin } from "react-icons/bs";


const AgentHome = () => {
    return (
        <div className=" bg-yellow-50 lg:min-h-screen">
           <Helmet>
                <title>HONEST || Dashboard || Agent Home </title>
            </Helmet>
          
            <div className="flex gap-12 flex-wrap justify-center lg:justify-between md:justify-between mx-auto  min-h-screen p-3">
                            
                            <div> <NavLink to={'/agentHome/CashInRequest'}>
                                <button className="flex flex-col justify-center items-center gap-2 hoverBtn hover:border-2 border-black p-2 rounded-md  font-semibold">
                                <BsCashCoin className="text-9xl" /> <h1>Cash In Request</h1>
                                </button>
                            </NavLink></div>
                            <div> <NavLink to={'/userHome'}>
                                <button className="flex flex-col justify-center items-center gap-2 hoverBtn hover:border-2 border-black p-2 rounded-md  font-semibold">
                                <FaHistory className="text-9xl" /> <h1>Transection history</h1>
                                </button>
                            </NavLink></div>
                         
                          
                        </div>
            
        </div>
    );
};

export default AgentHome;