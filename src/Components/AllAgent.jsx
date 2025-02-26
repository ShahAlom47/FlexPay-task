import { useEffect, useState } from "react";
import useAxiosPublic from "../CustomHocks/useAxiosPublic";

const AllAgent = () => {
    const AxiosPublic = useAxiosPublic();
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const res = await AxiosPublic.get("/api/users");
                const allAgents = res?.data?.data || [];
                const filteredAgents = allAgents.filter(agent => agent.accountType === "Agent");
                setAgents(filteredAgents);
            } catch (error) {
                console.error("Error fetching agents:", error);
            }
        };

        fetchAgents();
    }, [AxiosPublic]);

    // Active / Inactive Toggle
    const toggleAgentStatus = async (id, status) => {
        try {
            await AxiosPublic.patch(`/api/AgentStatus/${id}`, { isActive: status });
            setAgents(agents.map(agent =>
                agent._id === id ? { ...agent, isActive: status } : agent
            ));
        } catch (error) {
            console.error("Failed to update agent status:", error);
        }
    };
console.log(agents);
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Agents</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Mobile</th>
                            <th className="p-3 border">Status</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agents.map((agent) => (
                            <tr key={agent._id} className="text-center border">
                                <td className="p-3 border">{agent.name}</td>
                                <td className="p-3 border">{agent.email}</td>
                                <td className="p-3 border">{agent.mobile}</td>
                                <td className="p-3 border">
                                    {agent.isActive ? (
                                        <span className="text-green-500">Active</span>
                                    ) : (
                                        <span className="text-red-500">Inactive</span>
                                    )}
                                </td>
                                <td className="p-3 border">
                                    <button
                                        className={`p-2 rounded text-white ${
                                            agent.isActive ? "bg-red-500" : "bg-green-500"
                                        }`}
                                        onClick={() => toggleAgentStatus(agent._id, !agent.isActive)}
                                    >
                                        {agent.isActive ? 'Deactivate' : "Active"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllAgent;
