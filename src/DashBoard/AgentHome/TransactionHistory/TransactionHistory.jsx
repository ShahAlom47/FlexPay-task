import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../../SharedComponents/SectionHeading/SectionHeading";
import { useState } from "react";
import useAxios from "../../../CustomHocks/useAxios";
import useUser from "../../../CustomHocks/useUser";
import LoadingRing from "../../../SharedComponents/LoadingRing/LoadingRing";
import { ResponsiveTable } from "responsive-table-react";

const TransactionHistory = () => {
const axiosSecure=useAxios();
const {user}=useUser()


    const { data, isLoading, refetch } = useQuery({
        queryKey: ['transactionHistory'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/agent/transactionHistory/${user.mobile}`)
            return res.data?.transactions
        }
    })
    console.log(data);

    const columns = [
        {
            "id": "name",
            "text": "Name"
        },

        {
            "id": "mobile",
            "text": "Mobile"
        },
        {
            "id": "amount",
            "text": "Amount"
        },
        {
            "id": "category",
            "text": "Category"
        },
        
        {
            "id": "time",
            "text": "Time"
        },



    ];
    const tableData = data ? data.map(user => ({
        name: user.userName,
        mobile: user.userNumber,
        amount: user.amount,
        time:user.date,
        category:user.category,

    })) : [];




    return (
        <div className="min-h-screen">
            <div className="">
                <SectionHeading title="Transaction History"></SectionHeading>
            </div>
            <div className="">
            {
                isLoading ? <LoadingRing></LoadingRing> :
                    <div className="py-5"><ResponsiveTable columns={columns} data={tableData} />

                    </div>
            }


            </div>
            
        </div>
    );
};

export default TransactionHistory;