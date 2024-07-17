import { useState } from "react";
import SectionHeading from "../../../SharedComponents/SectionHeading/SectionHeading";
import agentImg from "../../../assets/Logo/agentCashIn.jpeg"
import cardImg from "../../../assets/Logo/cardCashin.jpeg"
import AgentCashIn from "../../../Components/AgentCashIn";


const CashIn = () => {
    const [selectedOption, setSelectedOption] = useState('agent');
    return (
        <div>
            <div>
                <SectionHeading title="Cash In"></SectionHeading>
            </div>
            <div className="">

                <div className="flex flex-col  p-4">

                   <div className="flex gap-2 justify-center">
                   <div
                        className="flex flex-col items-center p-6 hover:border rounded-lg hover:shadow-md cursor-pointer mb-4"
                        onClick={() => setSelectedOption('creditDebit')}
                    >
                        <img
                            src={cardImg}
                            alt="Credit/Debit Card"
                            className="w-1/2  mb-2 py-[2%]"
                        />
                        <h2 className="text-xl font-semibold">Credit/Debit Card</h2>
                    </div>


                    <div
                        className="flex flex-col items-center p-6 hover:border rounded-lg hover:shadow-md cursor-pointer"
                        onClick={() => setSelectedOption('agent')}
                    >
                        <img
                            src={agentImg}
                            alt="Agent Cash In"
                            className="w-1/2 mb-2"
                        />
                        <h2 className="text-xl font-semibold">Agent Cash In</h2>
                    </div>
                   </div>

                    {/* Conditionally render components based on selected option */}
                    <div className="mt-6">
                        {selectedOption === 'creditDebit' && "CreditDebitCardComponent"}
                        {selectedOption === 'agent' && <AgentCashIn></AgentCashIn>}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CashIn;