import SectionHeading from "../SharedComponents/SectionHeading/SectionHeading";


const AgentCashIn = () => {
    const handelForm=(e)=>{
        e.preventDefault()


    }
    return (
        <div className=" lg:w-8/12 md:w-10/12 w-full p-4 mx-auto">
        <h1 className="text-xl font-bold border-b-2">Agent</h1>

        <div className="p-4 shadow-red-200 shadow-md rounded-md my-4">

            <form onSubmit={handelForm} className=" flex justify-center  gap-3 flex-wra">
            <input name="number" type="number" placeholder="Agent Number" className="input input-bordered w-full max-w-xs" />
            <input name="amount" type="number" min={50} placeholder="Amount" className="input input-bordered w-full max-w-xs" />
            <input type="submit" value="Submit"  className="  btn btn-neutral"/>



            </form>
        </div>
        </div>
    );
};

export default AgentCashIn;