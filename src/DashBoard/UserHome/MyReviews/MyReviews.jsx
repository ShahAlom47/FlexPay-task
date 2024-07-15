
import {  useQuery } from "@tanstack/react-query";
import useAxios from "../../../CustomHocks/useAxios";
import useUser from "../../../CustomHocks/useUser";
import { format } from 'date-fns';
import Swal from "sweetalert2";


const MyReviews = () => {
    const { user } = useUser()
    const axiosSecure = useAxios()

    const { data, refetch } = useQuery({
        queryKey: ['myReview'],
        queryFn: async () => {

            const res = await axiosSecure.get(`/reviews/user/${user.email}`)
            return res.data
        }
    })


    const dateFormat = (date) => {
        const dates = new Date(date);
        const formattedDate = format(dates, 'PPpp')
        return formattedDate;
    }



    const handelDelete=async(id)=>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          })
          .then( async(result) => {
            if (result.isConfirmed) {
                const res=await axiosSecure.delete(`/reviews/user/delete/${id}`)
             
                if(res.data.deletedCount>0){
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });

                }


            }})




    }



    return (
        <div className="p-8 ">
            <div className=" border-b-2 pb-3 flex justify-between">
                <h1 className="text-3xl font-bold">My Reviews</h1>
                <h1 className="text-xl font-bold">Total:{data?.length || 0}</h1>

            </div>

            <div>
                {
                    data?.map(rev => <div key={rev._id} className=" my-3 border-2 p-4 rounded-sm">
                        <p className="text-xs mb-2">{dateFormat(rev.date)}</p>
                        <h1><span className="font-semibold">Property:</span> {rev.property_title} </h1>
                        <h1><span className="font-semibold">Agent:</span> {rev.agent_name} </h1>
                        <h1 className="text-xs mt-3"><span className="font-semibold">Review:</span> {rev.review} </h1>

                        <div className="flex justify-end">
                            <button onClick={() => handelDelete(rev._id)} className="btn btn-sm rounded-sm border-red-500">Delete</button>

                        </div>
                    </div>)
                }
            </div>



        </div>
    );
};

export default MyReviews;