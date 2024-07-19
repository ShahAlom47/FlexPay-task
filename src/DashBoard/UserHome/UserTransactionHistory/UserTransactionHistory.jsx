import { ResponsiveTable } from "responsive-table-react";
import SectionHeading from "../../../SharedComponents/SectionHeading/SectionHeading";
import LoadingRing from "../../../SharedComponents/LoadingRing/LoadingRing";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../CustomHocks/useAxios";
import useUser from "../../../CustomHocks/useUser";


const UserTransactionHistory = () => {
    const axiosSecure=useAxios();
    const {user}=useUser()
    
    
        const { data, isLoading } = useQuery({
            queryKey: ['transactionHistory'],
            queryFn: async () => {
                const res = await axiosSecure.get(`/user/transactionHistory/${user.mobile}`)
                return res.data?.transactions
            }
        })
        console.log(data);
    
        const columns = [
           
            {
                "id": "name",
                "text": "Agent Name"
            },
    
            {
                "id": "mobile",
                "text": " Send/Receive Number"
            },
            {
                "id": "amount",
                "text": "Amount"
            },
            {
                "id": "number",
                "text": "Number"
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
            number:  user?.userNumber,
            name:user?.category==='Send Money'? user?.receiverName : user?.agentName,
            mobile: user?.category==='Send Money'? user?.receiverNumber : user?.agentNumber,
            amount: user?.amount,
            time:user?.date,
            category:user?.category,
    
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

export default UserTransactionHistory;