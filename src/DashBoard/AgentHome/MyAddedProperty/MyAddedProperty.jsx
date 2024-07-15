import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../CustomHocks/useAxios";
import useUser from "../../../CustomHocks/useUser";
import LoadingRing from "../../../SharedComponents/LoadingRing/LoadingRing";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import Swal from "sweetalert2";



const MyAddedProperty = () => {
    const { user } = useUser()
    const axiosSecure = useAxios();
    const navigate = useNavigate();
    const location = useLocation()

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['myAddedProperty'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myAddedProperty/${user.email}`)
            return res.data
        }
    })

   



    const handelDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/myAddedProperty/delete/${id}`)
                if (res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        });

    }




    const handelModal = (id) => {
        navigate(`/dashBoard/myAddedProperty/edit/${id}`,{ state: location.pathname })

    }

  

    return (
        <div className="p-8 ">
            <div className=" border-b-2 pb-3">
                <h1 className="text-3xl font-bold">My Added Property</h1>
            </div>
            {
                isLoading ? <LoadingRing></LoadingRing> : <div className="space-y-3 my-5">
                    {
                        data?.map((property) => <div key={property._id}>



                            <div className="card card-side bg-base-100 shadow-xl flex flex-col lg:flex-row md:flex-row">
                                <figure className="lg:w-4/12 md:w-4/12 "><img src={property.property_image} alt="Movie" /></figure>
                                <div className="card-body py-3">
                                    <h2 className="card-title">{property.title}</h2>
                                    <p className="flex items-center"> <CiLocationOn /> {property.property_location}</p>

                                    <p className="font-semibold">${property.min_price}-${property.max_price}</p>
                                    <h2 className={` w-24 text-center rounded-sm
                                     ${property.verification_status === 'verified' ? 'bg-green-500' : ''}
                                     ${property.verification_status === 'pending' ? 'bg-yellow-500' : ''}
                                     ${property.verification_status === 'rejected' ? 'bg-red-500' : ''}
                                    
                                    `}>{property.verification_status}</h2>


                                    <div className="card-actions  border-t-2 py-3 my-2 md:flex lg:flex items-end ">
                                        <div className=" flex items-center gap-3 font-semibold bg-slate-300 rounded-sm p-1">
                                            <img className=" rounded-full w-10 h-10" src={property.agent_photo} alt="" />
                                            <p>{property.agent_name}</p>
                                        </div>
                                        <div className=" flex justify-between gap-3 items-end">
                                            <Link to={`/details/${property._id}`}><button className="btn btn-sm   rounded-sm border border-yellow-600">Details</button></Link>
                                            {
                                                property.verification_status !== 'rejected' ? <button onClick={() => handelModal(property._id)} className="btn btn-sm border  rounded-sm border-yellow-600">Edit</button> : <button disabled className="border btn btn-sm  rounded-sm border-yellow-600 ">Edit</button>

                                            }




                                            <button onClick={() => handelDelete(property._id)} className="btn btn-sm border  rounded-sm border-red-500">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>)

                    }
                    {/* Open the modal using document.getElementById('ID').showModal() method */}




                </div>
            }

        </div>
    );
};

export default MyAddedProperty;