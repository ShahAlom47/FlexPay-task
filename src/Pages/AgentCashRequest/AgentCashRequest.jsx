import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AgentCashRequest = () => {
    const [step, setStep] = useState(1); // Step 1 = Input, Step 2 = Summary & PIN
    const [adminNumber, setAdminNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);

    const handleNext = () => {
        if (!adminNumber || !amount) {
            toast.error("Please enter Admin Number and Amount.");
            return;
        }
        setStep(2); // Move to summary & PIN step
    };

    const handleSubmit = async () => {
        if (!pin) {
            toast.error("Please enter your PIN to confirm.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "https://mobile-banking-tawny.vercel.app/api/transaction/cashRequest",
                { adminNumber, amount, pin },
                { withCredentials: true } // ✅ Ensures authentication
            );

            if (response.data.success) {
                toast.success("Cash request sent successfully!");
                setAdminNumber("");
                setAmount("");
                setPin("");
                setStep(1); // Reset form
            } else {
                toast.error(response.data.message || "Request failed.");
            }
        } catch (error) {
            toast.error("Error submitting request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md text-black">
            <ToastContainer />

            {step === 1 ? (
                <>
                    <h2 className="text-xl font-bold mb-4">Agent Cash Request</h2>

                    <label className="block mb-2">Admin Number:</label>
                    <input
                        type="text"
                        value={adminNumber}
                        onChange={(e) => setAdminNumber(e.target.value)}
                        className="w-full p-2 text-white border rounded mb-4 "
                        placeholder="Enter Admin Number"
                    />

                    <label className="block mb-2">Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-2 text-white border rounded mb-4"
                        placeholder="Enter Amount"
                    />

                    <button
                        onClick={handleNext}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Next
                    </button>
                </>
            ) : (
                <>
                    <h2 className="text-xl font-bold mb-4">Confirm Cash Request</h2>

                    <p><strong>Admin Number:</strong> {adminNumber}</p>
                    <p><strong>Amount:</strong> ${amount}</p>

                    <label className="block mt-4 mb-2">Enter PIN:</label>
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="w-full p-2 text-white border rounded mb-4"
                        placeholder="Enter PIN"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`w-full py-2 rounded text-white ${
                            loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                        {loading ? "Processing..." : "Submit Request"}
                    </button>

                    <button
                        onClick={() => setStep(1)}
                        className="w-full mt-2 bg-gray-300 py-2 rounded hover:bg-gray-400"
                    >
                        Back
                    </button>
                </>
            )}
        </div>
    );
};

export default AgentCashRequest;
