import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../../SharedComponents/SectionHeading/SectionHeading";
import useAxios from "../../../CustomHocks/useAxios";
import useUser from "../../../CustomHocks/useUser";
import LoadingRing from "../../../SharedComponents/LoadingRing/LoadingRing";
import { ResponsiveTable } from "responsive-table-react";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useState } from "react";


const CashInRequest = () => {
    const { user } = useUser()
    const axiosSecure = useAxios()
    const [cashInId,setCashInId]=useState()

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['cashInData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/addCashInData/${user.mobile}`)
            return res.data
        }
    })

    console.log(data);

    const openModal = (id) => {
         document.getElementById('my_modal_5').showModal()
         setCashInId(id)
    }

const handelAccept=(id)=>{


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
        accept: <button onClick={() => openModal(user._id)} className='text-2xl text-red-500 ' ><IoMdCheckmarkCircleOutline className=' mx-auto' /></button>,
        reject: <button onClick={() => handelReject(user._id)} className='text-2xl text-red-500 ' ><MdOutlineCancel className=' mx-auto' /></button>
    })) : [];

    return (
        <div>
            <div className="">
                <SectionHeading title='Cash In Request'></SectionHeading>
            </div>
            {
                isLoading ? <LoadingRing></LoadingRing> :
                    <div><ResponsiveTable columns={columns} data={tableData} />

                    </div>
            }

            {/* modal   */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
         
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                   
                    <div className="modal-action">
                        <form onSubmit={()=>handelAccept(cashInId)}>
                        <input type="number"  className="input input-bordered"/>
                        <input className="btn btn-primary" type="submit" value="Accept" />
                        </form>
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