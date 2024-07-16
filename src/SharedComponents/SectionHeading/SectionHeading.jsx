
import PropTypes from 'prop-types';

const SectionHeading = ({title}) => {
    return (
        <div>
            <h1 className="text-2xl font-bold border-b-2 pb-3">{title}</h1>
        </div>
    );
};

export default SectionHeading;
SectionHeading.propTypes = {
    title: PropTypes.string.isRequired
};