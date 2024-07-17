
import PropTypes from 'prop-types';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const SectionHeading = ({title}) => {
    const navigate =useNavigate()
    return (
        <div className='flex gap-2 items-center border-b-4'>
                <button onClick={()=>navigate(-1)} className="text-2xl rounded-full  hover:bg-slate-400">  <IoArrowBackCircleOutline
             /></button>
            <h1 className="text-2xl font-bold border-b-2 ">{title}</h1>
        </div>
    );
};

export default SectionHeading;
SectionHeading.propTypes = {
    title: PropTypes.string.isRequired
};