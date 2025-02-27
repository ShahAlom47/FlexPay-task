import { useEffect, useState } from "react";
import useAxiosPublic from "../../CustomHocks/useAxiosPublic";
import { FaEye } from "react-icons/fa";

const OverView = () => {
    const AxiosPublic = useAxiosPublic();
    const [totalBalances, setTotalBalances] = useState(0);
    const [allTrans, setAllTrans] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await AxiosPublic.get("/api/transaction/totalBallances");
                const resTran = await AxiosPublic.get("/api/transaction/");
                setTotalBalances(res?.data?.data);
                setAllTrans(resTran?.data?.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchUsers();
    }, [AxiosPublic]);

 
    // **মডাল ওপেন/ক্লোজ ফাংশন**
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className=" text-black">
            <h1 className="text-black text-2xl font-bold w-full border-b-2 py-4">OverView</h1>

            <div className="p-3 my-8">
                <div className="flex gap-3 flex-wrap">
                    <h1 className="p-2 rounded-sm bg-slate-200 text-xl text-black">
                        Total Balances : <span className="text-3xl">{totalBalances}</span> TK
                    </h1>
                    <h1 className="p-2 rounded-sm bg-slate-200 text-xl text-black">
                        Total Transaction: <span className="text-3xl">{allTrans?.length}</span>
                    </h1>
                </div>

                {/* **টেবিল শুরু** */}
                <h1 className="text-black text-xl font-bold w-full border-b-2 py-4 mt-10">
                    All Transactions
                </h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 border">Sender</th>
                                <th className="p-3 border">Receiver</th>
                                <th className="p-3 border">Amount</th>
                                <th className="p-3 border">Fee</th>
                                <th className="p-3 border">Type</th>
                                <th className="p-3 border">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTrans.slice(0, 4).map((trans, index) => (
                                <tr key={index} className="text-center border">
                                    <td className="p-3 border">{trans.sender}</td>
                                    <td className="p-3 border">{trans.receiver}</td>
                                    <td className="p-3 border">{trans.amount} TK</td>
                                    <td className="p-3 border">{trans.fee} TK</td>
                                    <td className="p-3 border">{trans.transactionType}</td>
                                    <td className="p-3 border">{new Date(trans.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

              
                <button
                    onClick={toggleModal}
                    className="mt-4 ml-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                >
                    <FaEye /> View All
                </button>

                {/* **মডাল (সকল ট্রানজেকশন দেখানোর জন্য)** */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
                            <h2 className="text-2xl font-bold mb-4">All Transactions</h2>
                            <div className="overflow-x-auto max-h-96 overflow-y-auto">
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="p-3 border">Sender</th>
                                            <th className="p-3 border">Receiver</th>
                                            <th className="p-3 border">Amount</th>
                                            <th className="p-3 border">Fee</th>
                                            <th className="p-3 border">Type</th>
                                            <th className="p-3 border">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allTrans.map((trans, index) => (
                                            <tr key={index} className="text-center border">
                                                <td className="p-3 border">{trans.sender}</td>
                                                <td className="p-3 border">{trans.receiver}</td>
                                                <td className="p-3 border">{trans.amount} TK</td>
                                                <td className="p-3 border">{trans.fee} TK</td>
                                                <td className="p-3 border">{trans.transactionType}</td>
                                                <td className="p-3 border">
                                                    {new Date(trans.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button
                                onClick={toggleModal}
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OverView;
