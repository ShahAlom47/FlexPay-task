import { Link } from 'react-router-dom';
import cashIn from '../assets/features/cashIn.png'

const AgentNav = () => {
    return (
           <>
       
                   <Link to={'/dash/cashIn'}>
                       <button  className="   overflow-hidden shadow-black shadow-lg rounded-lg  hover:scale-95 transition-all duration-300">
                           <img className="   rounded-xl " src={cashIn} alt=" cash in  logo" />
                       </button>
                   </Link>
       
                 
       
                  
                   </>
    );
};

export default AgentNav;