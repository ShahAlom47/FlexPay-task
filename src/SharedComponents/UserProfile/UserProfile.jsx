import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";
import useUser from "../../CustomHocks/useUser";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FiEyeOff } from "react-icons/fi";


const UserProfile = () => {
    const { user } = useUser();
    const [showBalance,setShowBalance]=useState(false)

 
    // const [handelHost] = usePhotoHost();
    // const [photo, setPhoto] = useState('')
    // const modalRef = useRef(null);

    // const handelProfilePhoto = () => {
    //     document.getElementById('my_modal_5').showModal()
    // }



    // const handlePhotoForm = async (e) => {
    //     e.preventDefault();
    //     const photo = e.target.photo
    //     const imageFile = { image: photo.files[0] };
    //     const res = await handelHost(imageFile)

    //     if (res.success) {
    //         const photoURL = res.data.display_url;





    //     }

    // };



    return (
        <div className=" flex    ">
            <Helmet>
                <title>HONEST || Dashboard || Profile</title>
            </Helmet>
            <ToastContainer></ToastContainer>
            <div className=" lg:flex  items-center justify-between  lg:p-1 md:p-1 p-1 w-full rounded-md">
                <div className="lg:flex md:flex gap-8">
                <div className="mb-5   ">
                 <Link to={'/'}>   <h1 className="text-5xl font-bold"><span className="text-red-500 l">S</span>Cash</h1></Link>
                   
                </div>
                <div className="relative">
                    <button
                        // onClick={handelProfilePhoto}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Edit Photo"
                        className=" absolute bottom-3 right-0 bg-slate-300 border border-black rounded-full p-1"><FaRegEdit /></button>
                    <Tooltip id="my-tooltip" />
                    <div className=" w-12 h-12 ">
                        <img className="w-full h-full rounded-full border-2 border-black" src={user?.photoURL} alt="" />
                    </div>
                </div>

                <div>
                    
                    <h1 className=" text-xl font-semibold"> <span className="font-medium ">{user?.name}</span></h1>
                    
                <h1 onClick={()=>setShowBalance(!showBalance)} className=" flex gap-3  items-center cursor-pointer font-semibold">Balance:{showBalance?<span className="font-medium ">{user?.balance}</span>:<FiEyeOff />}</h1>
                

                </div>
                <div className=" gap-6 items-center">
                <h1 className="  font-semibold"><span className="font-medium ">{user?.email}</span></h1>
                <h1 className="  font-semibold"><span className="font-medium ">{user?.mobile}</span></h1>
                </div>
               
                </div>
            
            </div>


            {/* <dialog id="my_modal_5" ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form className=" flex flex-col gap-2" onSubmit={handlePhotoForm}>

                        <input className=" input input-bordered  flex items-center w-full" type="file" name="photo" />
                        <input className=" btn btn-neutral w-full" type="submit" value="Upload" />
                    </form>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog> */}

        </div>
    );
};

export default UserProfile;