import { useState } from "react";
import SectionHeading from "../../SharedComponents/SectionHeading/SectionHeading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CashOut = () => {
  const [agentNumber, setAgentNumber] = useState("");
  const [amount, setAmount] = useState("");

  // Hardcoded agent list (later to be fetched from database)
  const agents = [
    { id: 1, name: "Agent A", number: "01711112222" },
    { id: 2, name: "Agent B", number: "01822223333" },
    { id: 3, name: "Agent C", number: "01933334444" },
  ];

  // Function to auto-fill agent number
  const handleAgentClick = (number) => {
    setAgentNumber(number);
  };

  // Handle Cash Out
  const handleCashOut = () => {
    if (!agentNumber || !amount) {
      toast.error("Please enter agent number and amount.");
      return;
    }
    if (amount < 50) {
      toast.error("Minimum cash out amount is 50 Taka.");
      return;
    }

    // Success notification (Replace with API call later)
    toast.success(`Cash out of ${amount} Taka to ${agentNumber} successful!`);
    
    // Reset form
    setAgentNumber("");
    setAmount("");
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <ToastContainer />
      <SectionHeading title="Cash Out" />
      
      {/* Cash Out Form */}
      <div className="space-y-4 my-5">
        <div>
          <label className="block text-gray-700">Agent Number</label>
          <input
            type="text"
            value={agentNumber}
            onChange={(e) => setAgentNumber(e.target.value)}
            placeholder="Enter agent number"
            className="w-full p-3 border rounded-md mt-2"
          />
        </div>

        <div>
          <label className="block text-gray-700">Amount (Taka)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-3 border rounded-md mt-2"
            min="50"
          />
        </div>

        <button
          onClick={handleCashOut}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md mt-4"
        >
          Cash Out
        </button>
      </div>

      {/* Recent Agents List */}
      <div className=" border my-5 mt-20 text-black p-5">
        <h3 className="text-lg font-semibold mb-2">Recent Agents</h3>
        <ul className="space-y-2">
          {agents.map((agent) => (
            <li
              key={agent.id}
              onClick={() => handleAgentClick(agent.number)}
              className="flex justify-between items-center p-3 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
            >
              <span>{agent.name}</span>
              <span className="text-blue-500">{agent.number}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CashOut;
