import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../CustomHocks/useAxios";
import useUser from "../../../CustomHocks/useUser";
import LoadingRing from "../../../SharedComponents/LoadingRing/LoadingRing";

import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";


import Swal from "sweetalert2";


const WishList = () => {

    const { user } = useUser();

    const axiosSecure = useAxios()

    const { data, isLoading ,refetch} = useQuery({
        queryKey: ['userWishList'],
        queryFn: async () => {

            const res = await axiosSecure.get(`/wishList/${user.email}`)
            return res.data
        }
    })

   

    const handelDelete =async(id)=>{



        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const res= await axiosSecure.delete(`/wishList/delete/${id}`)

                if(res.data.deletedCount){
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your property has been deleted.",
                        icon: "success"
                      });
                   
                }
            }
          });
      
    
    }

    return (
        <div className=" lg:p-10 md:p-7 p-3">
            <div className=" border-b-2 pb-4">
                <h1 className="text-3xl font-bold ">Wish List</h1>
            </div>

            {
                isLoading ? <LoadingRing></LoadingRing> : <div className="space-y-3 my-5">
                    {
                        data?.map((wish) => <div key={wish._id}>

                            <div className="card card-side bg-base-100 shadow-xl flex flex-col lg:flex-row md:flex-row">
                                <figure className="lg:w-4/12 md:w-4/12 "><img src={wish.property_image} alt="Movie" /></figure>
                                <div className="card-body py-3">
                                    <h2 className="card-title">{wish.title}</h2>
                                    <p className="flex items-center"> <CiLocationOn /> {wish.property_location}</p>

                                    <p className="font-semibold">${wish.min_price}-${wish.max_price}</p>
                                    <h2 className={` w-24 text-center rounded-sm ${wish.verification_status==='Verified'? 'bg-green-500': 'bg-yellow-500'}`}>{wish.verification_status}</h2>

                                   
                                    <div className="card-actions  border-t-2 py-3 my-2 md:flex lg:flex items-end ">
                                    <div className=" flex items-center gap-3 font-semibold bg-slate-300 rounded-sm p-1">
                                       <img className=" rounded-full w-10 h-10" src={wish.agent_photo} alt="" />
                                       <p>{wish.agent_name}</p>
                                    </div>
                                      <div className=" flex justify-between gap-3 items-end">
                                      <Link to={`/details/${wish.property_id}`}><button className="btn btn-sm   rounded-sm border border-yellow-600">Details</button></Link>
                                      
                                      <Link to={`/dashBoard/makeOffer/${wish.property_id}`}><button className="btn btn-sm border  rounded-sm border-yellow-600">Make an offer</button></Link>
                                      <button onClick={()=>handelDelete(wish._id) } className="btn btn-sm border  rounded-sm border-red-500">Delete</button>
                                      </div>
                                      <p></p>
                                    </div>
                                </div>
                            </div>

                        </div>)

                    }


                </div>
            }


        </div>
    );
};

export default WishList;