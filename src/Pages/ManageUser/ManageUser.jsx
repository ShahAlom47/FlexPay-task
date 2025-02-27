import { useState } from "react";
import AllAgent from "../../Components/AllAgent";
import AllUsers from "../../Components/AllUsers";

const ManageUser = () => {
    const [activeTab, setActiveTab] = useState("users");

    return (
        <div className="container mx-auto p-4  text-black">
            <h2 className="text-2xl font-bold mb-4 text-center">Manage Users</h2>
            
            {/* Tabs */}
            <div className="flex  space-mb-6 border-blue-500 border-b">
                <button 
                    className={`p-2 px-4 rounded-t ${activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("users")}
                >
                    All Users
                </button>
                <button 
                    className={`p-2 px-4 rounded-t ${activeTab === "agents" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("agents")}
                >
                    All Agents
                </button>
            </div>

            {/* Content */}
            <div className="bg-white p-4 rounded shadow-md">
                {activeTab === "users" ? <AllUsers /> : <AllAgent />}
            </div>
        </div>
    );
};

export default ManageUser;
