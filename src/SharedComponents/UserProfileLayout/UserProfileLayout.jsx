import { FaRegEdit } from "react-icons/fa";
import useUser from "../../CustomHocks/useUser";
import useUserRole from "../../CustomHocks/useUserRole";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from "react-tooltip";
import usePhotoHost from "../../CustomHocks/usePhotoHost";


import { ToastContainer, toast } from "react-toastify";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet";






const UserProfileLayout = () => {
    const { user } = useUser();
    const { data } = useUserRole();
    const [handelHost] = usePhotoHost();
    const [photo,setPhoto]=useState('')
    const modalRef = useRef(null);


    const handelProfilePhoto = () => {
        document.getElementById('my_modal_5').showModal()
    }

 

    const handlePhotoForm =async (e) => {
        e.preventDefault();
        const photo = e.target.photo
        const  imageFile = {image:photo.files[0]};
        const res = await handelHost(imageFile)

        if (res.success) {
            const photoURL=res.data.display_url;
            
             

           

        }
      
      };




    return (
        <div className=" flex flex-col items-center justify-center lg:p-10 md:p-6 p-3 ">
         <Helmet>
            <title>HONEST || Dashboard || Profile</title>
         </Helmet>
         <ToastContainer></ToastContainer>
            <div className=" flex justify-center items-center flex-col bg-slate-300 p-6 rounded-md">
                <div className="relative">
                    <button
                        onClick={handelProfilePhoto}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Edit Photo"
                        className=" absolute bottom-3 right-0 bg-slate-300 border border-black rounded-full p-1"><FaRegEdit /></button>
                    <Tooltip id="my-tooltip" />
                    <div className=" w-28 h-28 ">
                        <img className="w-full h-full rounded-full border-2 border-black" src={user?.photoURL} alt="" />
                    </div>
                </div>
                <h1 className=" text-lg font-semibold uppercase  border-b-2">{data}</h1>
                <h1 className=" text-xl font-semibold"> <span className="font-medium ">{user?.displayName}</span></h1>
                <h1 className="  font-semibold">email: <span className="font-medium ">{user?.email}</span></h1>

            </div>

            <dialog id="my_modal_5" ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                   <form  className=" flex flex-col gap-2" onSubmit={handlePhotoForm}>

                    <input className=" input input-bordered  flex items-center w-full" type="file" name="photo"  />
                    <input className=" btn btn-neutral w-full" type="submit" value="Upload" />
                   </form>
                  
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>



    );
};

export default UserProfileLayout;