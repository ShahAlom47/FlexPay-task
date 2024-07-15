import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "../../../CustomHocks/useAxios";
import LoadingRing from "../../../SharedComponents/LoadingRing/LoadingRing";
import { ResponsiveTable } from "responsive-table-react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const ManageUser = () => {
    const axiosSecure = useAxios();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['manageUser'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allUser/admin');
            return res.data;
        }
    });

    const manageUserMutation = useMutation({
        mutationFn: async ({id, role}) => {
            const res = await axiosSecure.patch(`/user/admin/role/${id}`, { role })
            return res.data
        }
    })




    const handelUserRole = async (id, role) => {

        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to make this user ${role}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {

                manageUserMutation.mutate({id, role},{
                    onSuccess:async()=>{
                        refetch()
                            Swal.fire({
                                title: "Changed",
                                text: "User role updated success",
                                icon: "success"
                            });
        
                    }})


            }
        });


    }

    const handelDelate = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: " Delete!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/user/admin/delete/${id}`)
              
                if (res.data?.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
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
            "id": "userRole",
            "text": "User Role"
        },
        {
            "id": "makeAgent",
            "text": "Make Agent "
        },
        {
            "id": "makeAdmin",
            "text": "Make Admin"
        },
        {
            "id": "makeUser",
            "text": "Make User"
        },

        {
            "id": "deleteUser",
            "text": "Delete User"
        },



    ];

    // const fraudBtn=<> </>

    const tableData = data ? data.map(user => ({
        name: user.name,
        email: user.email,
        userRole: <h1 className="font-semibold uppercase">{user.role} {user.role==='agent'? <button onClick={() => { handelUserRole(user._id, 'fraud') }} className="btn btn-sm text-red-500">Make fraud{}</button>:''} </h1>,
        makeAgent:<>{user.role==='fraud'?<h1 className="text-red-500 font-medium ">Fraud</h1>: <button onClick={() => { handelUserRole(user._id, 'agent') }} className="btn btn-sm">Make Agent{ }</button>}</>,
        makeAdmin:<>{user.role==='fraud'?<h1 className="text-red-500 font-medium ">Fraud</h1>: <button onClick={() => { handelUserRole(user._id, 'admin') }} className="btn btn-sm">Make Admin </button>}</>,
        makeUser: <button onClick={() => { handelUserRole(user._id, 'user') }} className="btn btn-sm">Make  User</button>,
        deleteUser: <button onClick={() => { handelDelate(user._id) }} className="btn btn-sm bg-red-400 ">Delete </button>,
    })) : [];

    return (
        <div className="p-8">
            <Helmet>
                <title>HONEST || Dashboard || Manage User</title>
            </Helmet>
            <div className="border-b-2 pb-3">
                <h1 className="text-3xl font-bold">Manage User</h1>
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

export default ManageUser;