import { useEffect, useState } from "react";
import useAxiosPublic from "../../CustomHocks/useAxiosPublic";

const CashRequest = () => {
    const AxiosPublic = useAxiosPublic();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await AxiosPublic.get("/api/transaction/getAllCashRequest");
                setRequests(res?.data?.data || []);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchRequests();
    }, [AxiosPublic]);

    const handleApprove = async (id) => {
        try {
            await AxiosPublic.patch(`/api/transaction/approveCashRequest/${id}`,{isApproved : true });
            setRequests(requests.map(req => req._id === id ? { ...req, status: "Approved" } : req));
        } catch (error) {
            console.error("Error approving request:", error);
        }
    };


    return (
        <div className="p-4 overflow-x-auto text-black">
            <h2 className="text-2xl font-semibold mb-4">Cash Requests</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-2 px-4">Agent</th>
                        <th className="py-2 px-4">Amount</th>
                        <th className="py-2 px-4">Created At</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((req) => (
                        <tr key={req._id} className="border-b text-center">
                            <td className="py-2 px-4">{req.agent}</td>
                            <td className="py-2 px-4">{req.amount}</td>
                            <td className="py-2 px-4">{new Date(req.createdAt).toLocaleString()}</td>
                            <td className={`py-2 px-4 font-semibold ${req.status === "Approved" ? "text-green-600" : "text-red-600"}`}>
                                {req.status} 
                            </td>
                            <td className="py-2 px-4">
                                {req.status === "Approved" ? 
                                    
                                    <span className="text-green-500 ml-2">✔</span> :
                                    <button
                                        onClick={() => handleApprove(req._id)}
                                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                    >
                                        Approve
                                    </button> 
                                   }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CashRequest;
