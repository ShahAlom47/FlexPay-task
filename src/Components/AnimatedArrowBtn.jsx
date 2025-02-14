
import { FaArrowRightLong } from 'react-icons/fa6';

const AnimatedArrowBtn = () => {
    return (
        <div className="">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-white shadow-lg animate-pulse">
                <span className="absolute w-24 h-24 rounded-full border-8 border-cyan-500 opacity-30 animate-ping"></span>
                <span className="text-lg font-semibold text-white"><FaArrowRightLong /></span>
            </div>
        </div>
    );
};

export default AnimatedArrowBtn;