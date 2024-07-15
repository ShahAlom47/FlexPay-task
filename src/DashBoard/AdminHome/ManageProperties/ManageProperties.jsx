
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "../../../CustomHocks/useAxios";
import LoadingRing from "../../../SharedComponents/LoadingRing/LoadingRing";
import { ResponsiveTable } from "responsive-table-react";

import { MdOutlineCancel, MdVerified } from 'react-icons/md';
import { FcAcceptDatabase } from 'react-icons/fc';

import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const ManageProperties = () => {
    const axiosSecure = useAxios();
    const { data, isLoading ,refetch} = useQuery({
        queryKey: ['allPropertyAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allProperty/admin');
            
            return res.data;
        }
    });

    const managePropertyMutation = useMutation({
        mutationFn: async ({id,status}) => {
            const res = await axiosSecure.patch(`/property/admin/verify/${id}`,{status})
            return res.data
        }
    })

    const handelStatus = async (id, status) => {

        managePropertyMutation.mutate({id,status},{
            onSuccess:async()=>{
                refetch()
                Swal.fire(`Property ${status}  `)

            }})


       

    }

    const handleAccept = (id) => {
        handelStatus(id, 'verified')

    }
    const handleReject = (id) => {
        handelStatus(id, 'rejected')


    }

    const columns = [
        {
            "id": "title",
            "text": "Title"
        },
        {
            "id": "location",
            "text": "Location"
        },
        {
            "id": "agent",
            "text": "Agent Name"
        },
        {
            "id": "agentEmail",
            "text": "Agent Email"
        },
        {
            "id": "price",
            "text": "Price Range"
        },
      
        {
            "id": "accept",
            "text": "Accept"
        },
        {
            "id": "reject",
            "text": "Reject"
        }
       
    ];

    const tableData = data ? data.map(item => ({
        title: item.title,
        location: item.property_location,
        agent: item.agent_name,
        agentEmail: item.agent_email,
        price: <p>${item.min_price}-${item.max_price}</p>,
        accept:item.verification_status==='verified'?<MdVerified className="text-2xl text-green-500" />:<button className='text-2xl ' onClick={() => handleAccept(item._id)}><FcAcceptDatabase /></button>,
      
        reject: <button className='text-2xl text-red-500 ' onClick={() => handleReject(item._id)}><MdOutlineCancel className=' mx-auto' /></button>
    })) : [];

    return (
        <div className="p-8">
             <Helmet>
                <title>HONEST || Dashboard || Manage Property</title>
            </Helmet>
            <div className="border-b-2 pb-3">
                <h1 className="text-3xl font-bold">Manage Properties</h1>
            </div>

            {
                isLoading ? <LoadingRing /> :
                    <div className='adminProperty my-6'>
                        <ResponsiveTable columns={columns} data={tableData} />
                    </div>
            }
        </div>
    );
};

export default ManageProperties;
