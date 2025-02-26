import { useState } from "react";
import SectionHeading from "../../SharedComponents/SectionHeading/SectionHeading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../../CustomHocks/useAxiosPublic";

const CashOut = () => {
  const [step, setStep] = useState(1); // 1 = Form, 2 = Confirmation Step
  const [agentNumber, setAgentNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const AxiosPublic = useAxiosPublic()

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

  // Handle Next Step
  const handleNext = () => {

    setStep(2);
  };

  // Handle Cash Out Confirmation
  const handleCashOut = async () => {
    if (pin.length !== 4) {
      toast.error("PIN must be 4 digits.");
      return;
    }

    const data = {
      receiverNumber: agentNumber,
      amount: parseInt(amount),
      pin: pin,
    }
    const res = await AxiosPublic.post('/api/transaction/cashOut', data)

    console.log(res.data);



    setStep(1);
    setAgentNumber("");
    setAmount("");
    setPin("");
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <ToastContainer />
      <SectionHeading title="Cash Out" />

      {step === 1 ? (
        // Step 1: Input Form
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
            onClick={handleNext}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md mt-4"
          >
            Next
          </button>
        </div>
      ) : (
        // Step 2: Confirmation & PIN Input
        <div className="space-y-4 my-5 text-black ">
          <h3 className="text-xl font-bold  text-center border-b-2 ">
            Confirm Cash Out
          </h3>
          <p className="text-black text-center">
            <strong>Agent:</strong> {agentNumber} <br />
            <strong>Amount:</strong> {amount} Taka
          </p>

          <div>
            <label className="block text-gray-700  font-bold">Enter PIN</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter 4-digit PIN"
              maxLength="4"
              className="w-full p-3 border bg-white rounded-md mt-2 "
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="w-1/2 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-md"
            >
              Back
            </button>
            <button
              onClick={handleCashOut}
              className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-md"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Recent Agents List */}
      {step === 1 && (
        <div className="border my-5 mt-20 text-black p-5">
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
      )}
    </div>
  );
};

export default CashOut;
