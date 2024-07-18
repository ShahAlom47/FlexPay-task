import Swal from "sweetalert2";
import useAxios from "../../../CustomHocks/useAxios";
import useUser from "../../../CustomHocks/useUser";
import SectionHeading from "../../../SharedComponents/SectionHeading/SectionHeading";
import { useRef, useState } from "react";


const CashOut = () => {
    const axiosSecure = useAxios()
    const { user } = useUser()
    const [cashOutData, setCashOutData] = useState({})
    const date = new Date().toLocaleString()
    const mainFormRef = useRef(null); 
    const confirmFormRef = useRef(null); 


    const openModal = () => {

        document.getElementById('my_modal_5').showModal()
    }
    const closeModal = () => {
        document.getElementById('my_modal_5').close();
    };



    const handelForm = async (e) => {
        e.preventDefault()
        const form = e.target
        const agentNumber = form.number.value;
        const amount = form.amount.value;
        const cashOutData = {
            agentNumber,
            amount,
            category: 'Cash Out',
            userName: user.name,
            userEmail: user.email,
            userNumber: user.mobile,
            date: date,
        }
        setCashOutData(cashOutData)
        openModal();

    }

    const handelCashOut = async (e) => {
        e.preventDefault()
        const form = e.target
        const password = form.password.value;
        const cashOutDatas = { ...cashOutData, password }
        // console.log(cashOutDatas);
        const res = await axiosSecure.post(`/user/cashOut`, cashOutDatas)
        console.log(res.data);
        Swal.fire(res.data.message)
        if (res.data?.status === 'success') {
            closeModal()
            form.reset()
            if (mainFormRef.current) mainFormRef.current.reset(); 
            if (confirmFormRef.current) confirmFormRef.current.reset();

        }

    }

    return (
        <div>

            <div>
                <SectionHeading title="Cash Out"></SectionHeading>
            </div>
            <div className="">
                <div className=" lg:w-8/12 md:w-10/12 w-full p-4 mx-auto">
                    <h1 className="text-xl font-bold border-b-2">Agent</h1>

                    <div className="p-4 shadow-red-200 shadow-md rounded-md my-4">

                        <form ref={mainFormRef} onSubmit={handelForm} className=" flex justify-center  gap-3 flex-wra">
                            <input name="number" type="number" placeholder="Agent Number" required className="input input-bordered w-full max-w-xs" />
                            <input name="amount" type="number" min={50} placeholder="Amount" required className="input input-bordered w-full max-w-xs" />
                            <input type="submit" value="Cash Out" className="  btn btn-neutral" />



                        </form>
                    </div>
                </div>

            </div>

            {/* modal////////////////////////////// */}
            <dialog  id="my_modal_5" style={{ zIndex: 1 }} className="modal modal-bottom  sm:modal-middle">
                <div className="modal-box custom-modal">

                    <div className=" m-2 p-3 border-2  rounded-md ">
                        <p><span className="font-bold">Agent Number :</span> {cashOutData.agentNumber} </p>
                        <p><span className="font-bold">Amount :</span> {cashOutData.amount} Tk</p>
                        <p><span className="font-bold">CashOut Fee (1.5%) :</span> {(cashOutData.amount * 0.015).toFixed(2)} Tk</p>
                        <hr />
                        <p><span className="font-bold text-lg">Total :</span> {(cashOutData.amount * 1.015).toFixed(2)} Tk</p>
                    </div>
                    <div className=" flex justify-around">
                        <form ref={confirmFormRef} onSubmit={handelCashOut} className=" flex gap-4 mt-0  flex-wrap">
                            <input type="number" name="password" placeholder="Enter Your Pin" className="input input-bordered" />
                            <input className="btn btn-neutral" type="submit" value="Confirm" />
                        </form>
                        <div className="modal-action mt-0">
                            <form method="dialog">

                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>


        </div>
    );
};

export default CashOut;