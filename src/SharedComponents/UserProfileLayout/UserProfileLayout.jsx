import { FaRegEdit } from "react-icons/fa";
import useUser from "../../CustomHocks/useUser";
import useUserRole from "../../CustomHocks/useUserRole";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from "react-tooltip";
import usePhotoHost from "../../CustomHocks/usePhotoHost";


import { ToastContainer, toast } from "react-toastify";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { GiHamburgerMenu } from "react-icons/gi";






const UserProfileLayout = () => {
    const { user } = useUser();

    const { data } = useUserRole();
    const [handelHost] = usePhotoHost();
    const [photo, setPhoto] = useState('')
    const modalRef = useRef(null);

    console.log(data);
    const handelProfilePhoto = () => {
        document.getElementById('my_modal_5').showModal()
    }



    const handlePhotoForm = async (e) => {
        e.preventDefault();
        const photo = e.target.photo
        const imageFile = { image: photo.files[0] };
        const res = await handelHost(imageFile)

        if (res.success) {
            const photoURL = res.data.display_url;





        }

    };




    return (
        <div className=" flex    ">
            <Helmet>
                <title>HONEST || Dashboard || Profile</title>
            </Helmet>
            <ToastContainer></ToastContainer>
            <div className=" lg:flex  items-center justify-between bg-slate-300 lg:p-5 md:p-3 p-2 w-full rounded-md">
                <div className="lg:flex md:flex gap-8">
                <div className="relative">
                    <button
                        onClick={handelProfilePhoto}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Edit Photo"
                        className=" absolute bottom-3 right-0 bg-slate-300 border border-black rounded-full p-1"><FaRegEdit /></button>
                    <Tooltip id="my-tooltip" />
                    <div className=" w-16 h-16 ">
                        <img className="w-full h-full rounded-full border-2 border-black" src={user?.photoURL} alt="" />
                    </div>
                </div>

                <div>
                    
                    <h1 className=" text-xl font-semibold"> <span className="font-medium ">{user?.name}</span></h1>
                    <h1 className="  font-semibold"><span className="font-medium ">{user?.mobile}</span></h1>

                </div>
                <div className="lg:flex gap-6 items-center">
                <h1 className=" text-md font-semibold uppercase  border-b-2">{user.role}</h1>
                <h1 className="  font-semibold">Balance:<span className="font-medium ">{user?.balance}</span></h1>

                </div>
                </div>
                <div className="mb-5   ">
                    <h1 className="text-5xl font-bold"><span className="text-red-500 l">S</span>Cash</h1>
                    <button>
                    <GiHamburgerMenu/>
                    </button>
                </div>
            </div>


            <dialog id="my_modal_5" ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form className=" flex flex-col gap-2" onSubmit={handlePhotoForm}>

                        <input className=" input input-bordered  flex items-center w-full" type="file" name="photo" />
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