import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../../SharedComponents/SectionHeading/SectionHeading";
import useAxios from "../../../CustomHocks/useAxios";
import LoadingRing from "../../../SharedComponents/LoadingRing/LoadingRing";
import { ResponsiveTable } from "responsive-table-react";
import { MdOutlineCancel} from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import Swal from "sweetalert2";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const ManageUser = () => {
    const navigate =useNavigate()
    const axiosSecure = useAxios()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allUser`)
            return res.data
        }
    })
    const handelRole =async(role,id)=>{
    
        const res = await axiosSecure.patch(`/user/admin/role/${id}`,{role})
        console.log(res);
        if(res.data.modifiedCount>0){
            refetch()
            Swal.fire('Completed')
        }

    }

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

                const res = await axiosSecure.delete(`/user/admin/delete/${id}`)
                console.log(res);
                if(res.data.deletedCount>0){
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
    
    const columns = [
        {
            "id": "name",
            "text": "Name"
        },
        {
            "id": "email",
            "text": "Email"
        },
        {
            "id": "mobile",
            "text": "Mobile"
        },
        {
            "id": "balance",
            "text": "Balance"
        },
        {
            "id": "role",
            "text": "Role"
        },

        {
            "id": "delete",
            "text": "Delete"
        }

    ];
    const tableData = data ? data.map(user => ({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        balance: user.balance,
        role: <div>{user?.role}<div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1 text-xl p-1 bg-transparent"><TiEdit /></div> 
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a onClick={()=>handelRole("user",user._id)}>User</a></li>
                <li><a onClick={()=>handelRole("agent",user._id)} >Agent</a></li>
                <li><a onClick={()=>handelRole("admin",user._id)}>Admin</a></li>
                <li><a onClick={()=>handelRole("block",user._id)}>Block</a></li>
            </ul>
        </div></div>,

        delete: <button onClick={()=>handelDelete(user._id)} className='text-2xl text-red-500 ' ><MdOutlineCancel className=' mx-auto' /></button>
    })) : [];


    return (
        <div className=" min-h-screen px-5">
            <div className="flex gap-2 items-center my-5 border-b-4">
          <button onClick={()=>navigate(-1)} className="text-2xl rounded-full  hover:bg-slate-400">  <IoArrowBackCircleOutline /></button>
            <SectionHeading title={'Manage User'}></SectionHeading>
            </div>
            {
                isLoading ? <LoadingRing></LoadingRing> :
                    <div><ResponsiveTable columns={columns} data={tableData} />

                    </div>
            }
        </div>
    );
};

export default ManageUser;