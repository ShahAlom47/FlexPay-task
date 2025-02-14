
import PropTypes from 'prop-types';

const SectionHeading = ({title}) => {
    return (
        <div className="relative h-60 bg-center bg-cover" style={{ backgroundImage: 'url(https://i.ibb.co/QvpDX9L/coinhako-t28-Iw-Dy-GHn-U-unsplash-1.jpg)' }} >
        <div className=" bg-gradient-to-l to-[#1d1e62cd] from-[#ffffff91] bg-opacity-60 absolute top-0 left-0 w-full h-full z-40 pointer-events-none"></div>
        <div className='flex  gap-2 items-center h-full  '>
         
          <h1 className="text-4xl w-1/4 text-center z-50 uppercase  shadow-inner  px-2 pl-5 rounded-r-full    text-black font-bold">{title}</h1>
        </div>
      </div>
      
    );
};

export default SectionHeading;
SectionHeading.propTypes = {
    title: PropTypes.string.isRequired
};