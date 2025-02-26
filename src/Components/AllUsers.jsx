
import { useEffect, useState } from "react";
import { FaTrash, FaLock, FaUnlock, FaEye } from "react-icons/fa";
import useAxiosPublic from "../CustomHocks/useAxiosPublic";

const AllUsers = () => {
    const AxiosPublic = useAxiosPublic();
    const [users, setUsers] = useState([]);
    const [userTransactions, setUserTransactions] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await AxiosPublic.get("/api/users");
                setUsers(res?.data?.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [AxiosPublic]);

    const getUserAllTransactions = async (mobile) => {
        try {
            const res = await AxiosPublic.get(`/api/transaction/${mobile}`);
            setUserTransactions(res?.data?.data);
            setSelectedUser(mobile);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

console.log(users);

    const toggleBlockStatus = async (id, status) => {
        console.log(status);
        try {
        const res = await   await AxiosPublic.patch(`/api/auth/${id}`, { isBlocked:status });
            console.log(res?.data);
            setUsers(users.map(user => user._id === id ? { ...user, isBlocked: status } : user));
        } catch (error) {
            console.error("Failed to update block status:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await AxiosPublic.delete(`/users/${id}`);
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    return (
        <div className="container mx-auto p-4 text-black">
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Mobile</th>
                            <th className="p-3 border">Balance</th>
                            <th className="p-3 border">Role</th>
                            <th className="p-3 border">Transactions</th>
                            <th className="p-3 border">Status</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="text-center border">
                                <td className="p-3 border">{user.name}</td>
                                <td className="p-3 border">{user.email}</td>
                                <td className="p-3 border">{user.mobile}</td>
                                <td className="p-3 border">${user.balance}</td>
                                <td className="p-3 border">{user.accountType}</td>
                                <td className="p-3 border">
                                    <button className="bg-blue-500 text-white p-2 rounded" onClick={() => getUserAllTransactions(user.mobile)}>
                                        <FaEye />
                                    </button>
                                </td>
                                <td className="p-3 border">
                                    {user.isBlocked ? (
                                        <span className="text-red-500">Blocked</span>
                                    ) : (
                                        <span className="text-green-500">Active</span>
                                    )}
                                </td>
                                <td className="p-3 border flex justify-center gap-2">
                                    {user.isBlocked ? (
                                        <button className="bg-green-500 text-white p-2 rounded" onClick={() => toggleBlockStatus(user._id, false)}>
                                            <FaUnlock />
                                        </button>
                                    ) : (
                                        <button className="bg-red-500 text-white p-2 rounded" onClick={() => toggleBlockStatus(user._id, true)}>
                                            <FaLock />
                                        </button>
                                    )}
                                    <button className="bg-gray-500 text-white p-2 rounded" onClick={() => handleDelete(user._id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
                        <h2 className="text-2xl font-bold mb-4">Transactions for {selectedUser}</h2>
                        <ul className=" flex flex-col gap-3">
                            {userTransactions.map((tx) => (
                                <li key={tx._id} className="border-b-2 p-2 ">
                                    <span className="font-bold">Amount:</span> {tx.amount} TK, <span className="font-bold">Type:</span> {tx.transactionType},<span className="font-bold"> Receiver:</span> {tx.receiver},<span className="font-bold"> Sender:</span> {tx.sender}
                                </li>
                            ))}
                        </ul>
                        <button className="mt-4 bg-red-500 text-white p-2 rounded" onClick={() => setSelectedUser(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllUsers;