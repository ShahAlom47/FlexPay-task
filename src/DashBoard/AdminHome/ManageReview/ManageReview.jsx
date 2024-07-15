import { Helmet } from "react-helmet";
import useAxios from "../../../CustomHocks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingRing from "../../../SharedComponents/LoadingRing/LoadingRing";
import { format } from "date-fns";
import Swal from "sweetalert2";


const ManageReview = () => {
    const axiosSecure = useAxios();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allUserAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allReview');
            return res.data;
        }
    });

  

    const dateFormat=(date)=>{
        const dates = new Date(date);
        const formattedDate = format(dates, 'PPpp')
        return formattedDate;
    }

    const handelDelete= async(id)=>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async(result) => {
            if (result.isConfirmed) {
                const res=await axiosSecure.delete(`/reviews/user/delete/${id}`)
                if(res.data.deletedCount>0){
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Review has been deleted.",
                        icon: "success"
                      });
            
        
                }
            
            }
          });
       


    }

    return (
        <div className=" p-8">
             <Helmet>
                <title>HONEST || Dashboard || Manage Review</title>
            </Helmet>
            <div className="border-b-2 pb-3 flex justify-between">
                <h1 className="text-3xl font-bold">Manage Review</h1>
                <h1 className="text-xl font-bold">Total: {data?.length} </h1>

            </div>

            {
                isLoading ? <LoadingRing /> :
                <div>
                {
                    data?.map(rev=><div key={rev._id} className=" my-3 border-2 p-4 rounded-sm">
                      
                        <div className="flex gap-2 items-center">
                            <img className="w-12 h-12 rounded-full border-2" src={rev.user_photo} alt="" />
                        <div>
                        <h1> {rev.user_name} </h1>
                        <p className="text-xs mb-2">{ dateFormat(rev.date)}</p>

                        </div>
                        </div>
                      
                        <h1><span className="font-semibold">Reviewer Email:</span> {rev.user_email} </h1>
                        <h1><span className="font-semibold">Property:</span> {rev.property_title} </h1>
                        <h1><span className="font-semibold">Agent:</span> {rev.agent_name} </h1>
                        <h1 className="text-xs mt-3"><span className="font-semibold">Review:</span> {rev.review} </h1>
                  
                  <div className="flex justify-end">
                  <button onClick={()=>handelDelete(rev._id)} className="btn btn-sm rounded-sm border-red-500">Delete</button>
                   
                  </div>
                    </div>)
                }
            </div>
            }
        </div>
    );
};

export default ManageReview;