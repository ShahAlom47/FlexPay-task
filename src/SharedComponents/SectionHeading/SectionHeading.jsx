
import PropTypes from 'prop-types';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const SectionHeading = ({title}) => {
    const navigate =useNavigate()
    return (
        <div className="relative h-32 bg-center bg-cover" style={{ backgroundImage: 'url(https://i.ibb.co/QvpDX9L/coinhako-t28-Iw-Dy-GHn-U-unsplash-1.jpg)' }} >
        <div className="bg-[#15141470] bg-opacity-60 absolute top-0 left-0 w-full h-full z-40 pointer-events-none"></div>
        <div className='flex gap-2 items-center h-full px-4 bg-center bg-cover bg-opacity-70 z-50'>
          <button onClick={() => navigate(-1)} className="text-2xl rounded-full hover:bg-slate-400">
            <IoArrowBackCircleOutline />
          </button>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
      </div>
      
    );
};

export default SectionHeading;
SectionHeading.propTypes = {
    title: PropTypes.string.isRequired
};