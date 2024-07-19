import { ResponsiveTable } from "responsive-table-react";
import LoadingRing from "../../../SharedComponents/LoadingRing/LoadingRing";
import SectionHeading from "../../../SharedComponents/SectionHeading/SectionHeading";
import useAxios from "../../../CustomHocks/useAxios";
import useUser from "../../../CustomHocks/useUser";
import { useQuery } from "@tanstack/react-query";


const AllTransaction = () => {
    const axiosSecure=useAxios();
    const {user}=useUser()
    
    
        const { data, isLoading } = useQuery({
            queryKey: ['transactionHistory'],
            queryFn: async () => {
                const res = await axiosSecure.get(`/admin/AllTransaction`)
                return res.data
            }
        })
        console.log(data);
    
        const columns = [
            {
                "id": "fromNumber",
                "text": "From Number"
            },
    
            {
                "id": "toNumber",
                "text": "To Number"
            },
            {
                "id": "transactionType",
                "text": "Transaction Type"
            },
            {
                "id": "amount",
                "text": "Amount"
            },
            {
                "id": "date",
                "text": "Date"
            },
    
    
    
        ];
        const tableData = data ? data.map(user => ({
            fromNumber:user.category==='Send Money'||user.category ==='Cash Out'? user.userNumber :user.agentNumber,
            toNumber: user.userNumber,
            transactionType: user.category,
            amount:user.amount,
            date:user.date,
    
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

export default AllTransaction;