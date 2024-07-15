import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "../../../CustomHocks/useAxios";
import useUser from "../../../CustomHocks/useUser";
import LoadingRing from "../../../SharedComponents/LoadingRing/LoadingRing";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const RequestedProperty = () => {

    const { user } = useUser()
    const axiosSecure = useAxios()

    const { data, isLoading ,refetch} = useQuery({
        queryKey: ['requestedProperty'],
        queryFn: async () => {

            const res = await axiosSecure.get(`/offeredProperty/request/${user.email} `)
            return res.data
        }
    })

    const requestedPropertyMutation = useMutation({
        mutationFn: async ({id, vStatus}) => {
           
            const res = await axiosSecure.patch(`/offeredProperty/status/${id}`, vStatus)
            return res.data
        }
    })


    const handelVerificationStatus = async (id, vStatus) => {
        

        requestedPropertyMutation.mutate({id,vStatus},{
            onSuccess:async()=>{
                refetch()
              vStatus.verification_status==='accepted' ? toast.success('Offer Accepted'):toast.error('Offer Rejected')
            }
        })
       
        // const res = await axiosSecure.patch(`/offeredProperty/status/${id}`, vStatus)
        // if(res.data.modifiedCount>0){
        //     refetch()
        //    
        //   vStatus.verification_status==='accepted' ? toast.success('Offer Accepted'):toast.error('Offer Rejected')
        // }
      
    }

    const handelAccept = (id) => {
        const vStatus = { verification_status: 'accepted' }
        handelVerificationStatus(id, vStatus)


    }
    const handelReject = (id) => {
        const vStatus = { verification_status: 'rejected' }
        handelVerificationStatus(id, vStatus)


    }

    return (
        <div className="p-8">
            <ToastContainer></ToastContainer>
            <div className="border-b-2 pb-3">
                <h1 className="text-3xl font-bold">Requested Property</h1>
            </div>

            {
                isLoading ? <LoadingRing></LoadingRing> : <div className="space-y-3 my-5">
                    {
                        data?.map((property) => <div key={property._id}>



                            <div className="card card-side bg-base-100 shadow-xl flex flex-col lg:flex-row md:flex-row">
                                <div className="card-body py-3">
                                    <h2 className="card-title">{property.property_title}</h2>
                                    <p className=""> <span className=" font-semibold">Location: </span>{property.property_location}</p>
                                    <p className=""> <span className=" font-semibold">Offered Price: </span>{property.price}</p>
                                    <p className=""> <span className=" font-semibold">Buyer Name: </span>{property.buyer_name}</p>
                                    <p className=""> <span className=" font-semibold">Buyer Email: </span>{property.buyer_email}</p>
                                    <h2 className={` w-24 text-center rounded-sm p-1 uppercase font-semibold
                                     ${property.verification_status === 'accepted' ? 'bg-green-500' : ''}
                                     ${property.verification_status === 'pending' ? 'bg-yellow-500' : ''}
                                     ${property.verification_status === 'rejected' ? 'bg-red-500' : ''}
                                    
                                    `}>{property.verification_status}</h2>
                                    <div className="card-actions  border-t-2 py-3 my-2 md:flex lg:flex items-end ">

                                        <div className=" flex justify-between gap-3 items-end">
                                            <Link to={`/details/${property.property_id}`}><button className="btn btn-sm   rounded-sm border border-yellow-600">Details</button></Link>
                                            <button onClick={() => handelAccept(property._id)} className="btn btn-sm border  rounded-sm border-green-500">Accept</button>
                                            <button onClick={() => handelReject(property._id)} className="btn btn-sm border  rounded-sm border-red-500">Reject</button>
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

export default RequestedProperty;