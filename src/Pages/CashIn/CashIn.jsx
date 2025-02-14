import { useState } from "react";
import SectionHeading from "../../SharedComponents/SectionHeading/SectionHeading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CashIn = () => {
  const [step, setStep] = useState(1); // Step 1: Form, Step 2: Confirmation
  const [customerNumber, setCustomerNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");

  // Handle Next Step
  const handleNext = () => {
    if (!customerNumber || !amount) {
      toast.error("Please enter agent number and amount.");
      return;
    }
    if (amount < 50) {
      toast.error("Minimum cash-in amount is 50 Taka.");
      return;
    }
    setStep(2);
  };

  // Handle Cash In Confirmation
  const handleCashIn = () => {
    if (pin.length !== 4) {
      toast.error("PIN must be 4 digits.");
      return;
    }
    toast.success(`Cash-in of ${amount} Taka from ${customerNumber} successful!`);
    setStep(1);
    setCustomerNumber("");
    setAmount("");
    setPin("");
  };

  return (
    <div className="mx-auto bg-white  rounded-lg shadow-md ">
      <ToastContainer />
      <SectionHeading title="Cash In " />

      {step === 1 ? (
        <div className="space-y-4 my-5 p-4">
          <div>
            <label className="block text-gray-700">Customer Number</label>
            <input
              type="text"
              value={customerNumber}
              onChange={(e) => setCustomerNumber(e.target.value)}
              placeholder="Enter customer number"
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
        <div className="space-y-4 my-5 text-black">
          <h3 className="text-lg font-semibold text-center">Confirm Cash In</h3>
          <p className="text-gray-600 text-center">
            <strong>Agent:</strong> {customerNumber} <br />
            <strong>Amount:</strong> {amount} Taka
          </p>

          <div>
            <label className="block text-gray-700">Enter PIN</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter 5-digit PIN"
              maxLength="5"
              className="w-full p-3 border rounded-md mt-2"
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
              onClick={handleCashIn}
              className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-md"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashIn;
