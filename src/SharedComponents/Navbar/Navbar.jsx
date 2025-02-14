 import { Link } from 'react-router-dom';
 import { BiLogInCircle } from "react-icons/bi";
import logo from '../../assets/features/fp-logo.png'

const Navbar = () => {
  return (
    <div className="absolute top-0 z-50 w-full  ">
      <div className=" h-24 w-11/12 mx-auto flex justify-between items-center "> 
        <div className=" h-8">
          <img className=' h-full'  src={logo} alt="logo" />
        </div>

        <div className=" flex gap-5 justify-around items-center font-semibold text-white  ">
          <Link to={'/'}><button className=' hover:scale-105  hover:underline '>Home</button></Link>
          <Link to={'/'}><button className='hover:scale-105  hover:underline '>Services</button></Link>

        </div>


        <div className="">
          <Link to={'/login'}><button className=' text-lg flex  gap-2 items-center group'>Login <BiLogInCircle className='  group-hover:scale-125' /></button></Link>

        </div>
      </div>
      <div className="">
        <svg
          className="absolute bottom-0 left-0 w-full"
          height="20"
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
        >
          <polyline points="0,0 15,0 20,18 80,18 85,0 100,0" stroke="#2b3a4e" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

    </div>
  );
};


export default Navbar