import Swal from "sweetalert2";
import useAxios from "../CustomHocks/useAxios";



const AgentCashIn = () => {
    const axiosSecure=useAxios()


    const handelForm=async(e)=>{
        e.preventDefault()
        const form= e.target
        const agentNumber= form.number.value;
        const amount = form.amount.value;
        const cashInData= {agentNumber,amount,category:'cash in',status:'pending'}
        console.log(cashInData);

        const res = await axiosSecure.post('/addCashInData',cashInData)
        console.log(res.data);
        if(res.data.insertedId){
            form.reset()
            Swal.fire('Request submitted, wait for agent confirmation')

        }
       

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