import { Helmet } from "react-helmet";
import { useNavigate, useRouteError } from "react-router-dom";
import imgErr from '../../assets/404.gif'
import { FaArrowLeft } from "react-icons/fa";
import PropTypes from 'prop-types';


export default function ErrorPage({ btn }) {
  const navigate = useNavigate()
  const error = useRouteError();
 


  return (
    <div id="error-page" className="w-full  flex flex-col justify-center items-center ">
      <Helmet>
        <title>---- | Error </title>
      </Helmet>
      <div className="w-3/6 h-3/6 relative flex flex-col justify-center items-center ">
        <img className="w-3/6 h-3/6" src={imgErr} alt="" />

        <div className="text-center w-4/6 h-3/6">

          <h1 className=" text-4xl font-bold">Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error?.statusText || error?.message}</i>
          </p>
         {
          btn?'': <div className=" flex gap-5 items-center justify-center">
          <button onClick={() => navigate(-1)} className="btn  btn-sm  my-3  "> <FaArrowLeft /> Back </button>
          <button onClick={() => navigate('/')} className="btn  btn-sm  my-3 "> Home</button>
        </div>
         }
        </div>
      </div>



    </div>
  );
}

ErrorPage.propTypes = {
  btn: PropTypes.bool
};