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


const ManageUser = () => {
    const axiosSecure = useAxios()
    const { data, isLoading, error } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allUser`)
            return res.data
        }
    })
    const handelRole =(role)=>{
        console.log(role);
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
        role: <p>{user.role}<div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1"><TiEdit /></div> 
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a onClick={()=>handelRole("user")}>User</a></li>
                <li><a onClick={()=>handelRole("agent")} >Agent</a></li>
                <li><a onClick={()=>handelRole("admin")}>Admin</a></li>
                <li><a onClick={()=>handelRole("block")}>Block</a></li>
            </ul>
        </div></p>,

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