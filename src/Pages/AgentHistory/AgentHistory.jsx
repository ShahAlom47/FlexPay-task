import { useEffect, useState } from "react";
import useAxiosPublic from "../../CustomHocks/useAxiosPublic";

const AgentHistory = () => {
    const [historyData, setHistoryData] = useState([]);
    const AxiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const resTran = await AxiosPublic.get(`/api/transaction/`);
                console.log(resTran);
                setHistoryData(resTran?.data?.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchUsers();
    }, [AxiosPublic]);

    // Delete Transaction
    const handleDelete = async (id) => {
       const confirmDelete= window.alert("This functionality is currently under development.");
        // const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;

        try {
            // await AxiosPublic.delete(`/api/transaction/agent/${id}`);
            // setHistoryData(historyData.filter((transaction) => transaction._id !== id));
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Agent Transaction History</h2>
            {historyData?.length === 0 ? (
                <p className="text-gray-500">No transactions found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 text-black">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="p-3 border border-gray-600">#</th>
                                <th className="p-3 border border-gray-600">Date</th>
                                <th className="p-3 border border-gray-600">Amount</th>
                                <th className="p-3 border border-gray-600">Fee</th>
                                <th className="p-3 border border-gray-600">Receiver</th>
                                <th className="p-3 border border-gray-600">Sender</th>
                                <th className="p-3 border border-gray-600">Transaction Type</th>
                                <th className="p-3 border border-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyData?.map((transaction, index) => (
                                <tr key={transaction._id} className="text-center bg-gray-200">
                                    <td className="p-3 border border-gray-600">{index + 1}</td>
                                    <td className="p-3 border border-gray-600">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                                    <td className="p-3 border border-gray-600">{transaction.amount} BDT</td>
                                    <td className="p-3 border border-gray-600">{transaction.fee ? transaction.fee.toFixed(2) : "0.00"} BDT</td>
                                    <td className="p-3 border border-gray-600">{transaction.receiver}</td>
                                    <td className="p-3 border border-gray-600">{transaction.sender}</td>
                                    <td className="p-3 border border-gray-600">{transaction.transactionType}</td>
                                    <td className="p-3 border border-gray-600">
                                        <button
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                            onClick={() => handleDelete(transaction._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AgentHistory;
