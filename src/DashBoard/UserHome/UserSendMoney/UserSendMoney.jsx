import { useRef, useState } from "react";
import useAxios from "../../../CustomHocks/useAxios";
import useUser from "../../../CustomHocks/useUser";
import Swal from "sweetalert2";
import SectionHeading from "../../../SharedComponents/SectionHeading/SectionHeading";


const UserSendMoney = () => {
    const axiosSecure = useAxios()
    const { user } = useUser()
    const [sendMoneyData, setSendMoneyData] = useState({})
    const date = new Date().toLocaleString()
    const mainFormRef = useRef(null);
    const confirmFormRef = useRef(null);
    const [fee, setFee] = useState(false)
    let sendMoneyFee = 5;
    let formUserAmount = 0



    const openModal = () => {

        document.getElementById('my_modal_5').showModal()
    }
    const closeModal = () => {
        document.getElementById('my_modal_5').close();
    };



    const handelForm = async (e) => {
        e.preventDefault()
        const form = e.target
        const receiverNumber = form.number.value;
        const userAmount = form.amount.value;
        let amount = userAmount;
        formUserAmount=userAmount
        setFee(false)



        if (userAmount > user?.balance) {
            Swal.fire('Your Balance is Low ')
            return
        }
        else if (userAmount < 50) {
            Swal.fire(' you can send money minimum 50 tk  to max 100000 tk ')
            return
        }
        else if (userAmount >= 100) {
            amount = (parseFloat(userAmount) + parseFloat(sendMoneyFee)).toFixed(2);
            setFee(true)
        }

        const cashOutData = {
            receiverNumber,
            amount,
            category: 'Send Money',
            userName: user.name,
            userEmail: user.email,
            userNumber: user.mobile,
            date: date,
        }

        setSendMoneyData(cashOutData)
        openModal();

    }

    const handelCashOut = async (e) => {
        e.preventDefault()
        const form = e.target
        const password = form.password.value;
        const sendMoneyDatas = { ...sendMoneyData, password }
        console.log(sendMoneyDatas);
        // const res = await axiosSecure.post(`/user/sendMoney`, sendMoneyDatas)
        // console.log(res.data);
        // Swal.fire(res.data.message)
        // if (res.data?.status === 'success') {
        //     closeModal()
        //     form.reset()
        //     if (mainFormRef.current) mainFormRef.current.reset();
        //     if (confirmFormRef.current) confirmFormRef.current.reset();

        // }

    }
    return (
        <div>

            <div>
                <SectionHeading title="Send Money"></SectionHeading>
            </div>
            <div className="">
                <div className=" lg:w-8/12 md:w-10/12 w-full p-4 mx-auto">
                    <h1 className="text-xl font-bold border-b-2">Agent</h1>

                    <div className="p-4 shadow-red-200 shadow-md rounded-md my-4">

                        <form ref={mainFormRef} onSubmit={handelForm} className=" flex justify-center  gap-3 flex-wra">
                            <input name="number" type="number" placeholder=" Number" required className="input input-bordered w-full max-w-xs" />
                            <input name="amount" type="number" min={50} placeholder="Amount" required className="input input-bordered w-full max-w-xs" />
                            <input type="submit" value="Send" className="  btn btn-neutral" />



                        </form>
                    </div>
                </div>

            </div>

            {/* modal////////////////////////////// */}
            <dialog id="my_modal_5" style={{ zIndex: 1 }} className="modal modal-bottom  sm:modal-middle">
                <div className="modal-box custom-modal">

                    <div className=" m-2 p-3 border-2  rounded-md ">
                        <p><span className="font-bold">Number :</span> {sendMoneyData.receiverNumber} </p>
                        <p><span className="font-bold">Amount :</span> {sendMoneyData.amount>=100?sendMoneyData.amount-sendMoneyFee:sendMoneyData.amount} Tk</p>
                        {fee ? <p><span className="font-bold">Send Money Fee :</span> {sendMoneyFee} Tk</p>:''}
                        <hr />
                        <p><span className="font-bold text-lg">Total :</span> {sendMoneyData.amount} Tk</p>
                    </div>
                    <div className=" flex justify-around">
                        <form ref={confirmFormRef} onSubmit={handelCashOut} className=" flex gap-4 mt-0  flex-wrap">
                            <input type="number" name="password" required placeholder="Enter Your Pin" className="input input-bordered" />
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

export default UserSendMoney;