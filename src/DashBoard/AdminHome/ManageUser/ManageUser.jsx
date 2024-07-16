import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../../SharedComponents/SectionHeading/SectionHeading";
import useAxios from "../../../CustomHocks/useAxios";
import useAxiosPublic from "../../../CustomHocks/useAxiosPublic";
import { useEffect } from "react";
import LoadingRing from "../../../SharedComponents/LoadingRing/LoadingRing";
import { ResponsiveTable } from "responsive-table-react";
import { MdOutlineCancel, MdVerified } from "react-icons/md";
import { FcAcceptDatabase } from "react-icons/fc";
import { TiEdit } from "react-icons/ti";
import Swal from "sweetalert2";


const ManageUser = () => {
    const axiosSecure = useAxios()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allUser`)
            return res.data
        }
    })
    const handelRole =async(role,id)=>{
        console.log(role,id);
        const res = await axiosSecure.patch(`/user/admin/role/${id}`,{role})
        console.log(res);
        if(res.data.modifiedCount>0){
            refetch()
            Swal.fire('Completed')
        }

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

        delete: <button className='text-2xl text-red-500 ' ><MdOutlineCancel className=' mx-auto' /></button>
    })) : [];


    return (
        <div className=" min-h-screen px-5">
            <SectionHeading title={'Manage User'}></SectionHeading>
            {
                isLoading ? <LoadingRing></LoadingRing> :
                    <div><ResponsiveTable columns={columns} data={tableData} />

                    </div>
            }
        </div>
    );
};

export default ManageUser;