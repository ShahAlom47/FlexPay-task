import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../../SharedComponents/SectionHeading/SectionHeading";
import useAxios from "../../../CustomHocks/useAxios";
import useUser from "../../../CustomHocks/useUser";
import LoadingRing from "../../../SharedComponents/LoadingRing/LoadingRing";
import { ResponsiveTable } from "responsive-table-react";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useState } from "react";
import Swal from "sweetalert2";


const CashInRequest = () => {
    const { user } = useUser()
    const axiosSecure = useAxios()
    const [cashInData,setCashInData]=useState({})

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['cashInData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/addCashInData/${user.mobile}`)
            return res.data
        }
    })

    

    const openModal = (cashInData) => {
        setCashInData(cashInData)
         document.getElementById('my_modal_5').showModal()
    }
    const closeModal = () => {
        document.getElementById('my_modal_5').close();
      };
    

const handelAccept= async(e)=>{
e.preventDefault();
const form= e.target;
const password= form.password.value;
console.log(cashInData);
const cashInDatas={
    agentNumber: cashInData.agentNumber,
    agentName: user.name,
    agentEmail: user.email,
    userName:cashInData.userName,
    userNumber: cashInData.userMobile,
    userEmail: cashInData.userEmail,
    amount: cashInData.amount, 
    category: cashInData.category,
    agentPassword:password,
    cashInDataId:cashInData._id
}
const  res= await axiosSecure.patch('/agent/cashIn',cashInDatas)
console.log(res);
Swal.fire(
    {
     
        text: res?.data?.message,
        customClass: {
            popup: 'my-swal' 
        }
    })
if(res.data.message==='Balance updated successfully'){
    refetch()
    form.reset()
    closeModal()
}


}
    

    const handelReject = () => {

    }

    const columns = [
        {
            "id": "name",
            "text": "Name"
        },

        {
            "id": "mobile",
            "text": "Mobile"
        },
        {
            "id": "amount",
            "text": "Amount"
        },
        {
            "id": "status",
            "text": "Status"
        },
        {
            "id": "accept",
            "text": "Accept"
        },
        {
            "id": "reject",
            "text": "Reject"
        },



    ];
    const tableData = data ? data.map(user => ({
        name: user.userName,
        mobile: user.userMobile,
        amount: user.amount,
        status: user.status,
        accept: <button onClick={() => openModal(user)} className='text-2xl text-green-500 ' ><IoMdCheckmarkCircleOutline className=' mx-auto' /></button>,
        reject: <button onClick={() => handelReject(user._id)} className='text-2xl text-red-500 ' ><MdOutlineCancel className=' mx-auto' /></button>
    })) : [];

    return (
        <div className="py-4">
            <div className="">
                <SectionHeading title='Cash In Request'></SectionHeading>
            </div>
            {
                isLoading ? <LoadingRing></LoadingRing> :
                    <div className="py-5"><ResponsiveTable columns={columns} data={tableData} />

                    </div>
            }

         
         
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box flex justify-around">
                   
                    
                        <form onSubmit={handelAccept} className=" flex gap-4 mt-0  flex-wrap">
                        <input type="number" name="password"  placeholder="Enter Your Pin" className="input input-bordered"/>
                        <input className="btn btn-neutral" type="submit" value="Accept" />
                        </form>
                        <div className="modal-action mt-0">
                        <form method="dialog">
                            
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default CashInRequest;