import { useEffect, useState } from "react";
import useAxiosPublic from "../../CustomHocks/useAxiosPublic";
import useUser from "../../CustomHocks/useUser";
import axios from "axios";

const UserHistory = () => {

    const [historyData, setHistoryData] = useState([]);
    const { user } = useUser();
    console.log(user?.mobile,historyData);

    useEffect(() => {
        if (!user?.mobile) return; 

        const fetchHistory = async () => {
            try {
                const res =   await axios.get(
                `https://mobile-banking-tawny.vercel.app/api/transaction/${user?.mobile}`,
                {},
                {
                    withCredentials: true, // Include cookies in the request
                }
            )
                setHistoryData(res.data); 
            } catch (error) {
                console.error("Error fetching transaction history:", error);
            }
        };

        fetchHistory();
    }, [user?.mobile]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Transaction History</h2>
            {historyData.length === 0 ? (
                <p className="text-gray-500">No transactions found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="p-3 border border-gray-600">#</th>
                                <th className="p-3 border border-gray-600">Date</th>
                                <th className="p-3 border border-gray-600">Amount</th>
                                <th className="p-3 border border-gray-600">Status</th>
                                <th className="p-3 border border-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyData.map((transaction, index) => (
                                <tr key={transaction._id} className="text-center bg-gray-200">
                                    <td className="p-3 border border-gray-600">{index + 1}</td>
                                    <td className="p-3 border border-gray-600">{new Date(transaction.date).toLocaleDateString()}</td>
                                    <td className="p-3 border border-gray-600">${transaction.amount}</td>
                                    <td className={`p-3 border border-gray-600 ${transaction.status === "Completed" ? "text-green-600" : "text-red-600"}`}>
                                        {transaction.status}
                                    </td>
                                    <td className="p-3 border border-gray-600">
                                        <button className="bg-red-600 text-white px-3 py-1 rounded mr-2">Delete</button>
                                        <button className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
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

export default UserHistory;
