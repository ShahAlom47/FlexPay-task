import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../CustomHocks/useAxios";
import PropTypes from 'prop-types';
import useUser from "../../../CustomHocks/useUser";
import useAxiosPublic from "../../../CustomHocks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import LoadingRing from "../../../SharedComponents/LoadingRing/LoadingRing";
import Swal from "sweetalert2";



const CheckOutForm = ({propertyId}) => {
    const stripe = useStripe();
  const elements = useElements();
const axiosSecure=useAxios()

const axiosPublic = useAxiosPublic();
const { user } =useUser()
const navigate = useNavigate();

const [errMsg, setErrMsg] = useState('');
const [clientSecret, setClientSecret] = useState('');
const [transactionId, setTransactionId] = useState('');
const [price,setPrice]=useState(0)






    const { data, isLoading } = useQuery({
        queryKey: ['offeredDataSingle'],
        queryFn: async () => {
          const res= await axiosSecure.get(`/offeredProperty/singleData/${propertyId}`)
          return res.data;
        },
        
      });
    //   

 

    useEffect(() => {
        if (data) {
          setPrice(parseFloat(data.price));
    
          const createPaymentIntent = async () => {
            try {
              const response = await axiosSecure.post("/create-payment-intent", { price: parseFloat(data.price) });
            
              setClientSecret(response.data.clientSecret);
              setErrMsg('')
            } catch (error) {
              setErrMsg( error?.response?.data?.error)
             
            }
          };
    
          createPaymentIntent();
        }
      }, [axiosSecure, data]);

    if(isLoading){
            return(
                <LoadingRing></LoadingRing>
            )
          }

    const handelForm = async (e) => {
        setErrMsg('')
        setTransactionId('')
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error,  } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setErrMsg(error.message)
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,
                    }
                }
            }
        )
        if (confirmError) {
            // console.log(confirmError);
        }
        else {
            if (paymentIntent.status === 'succeeded') {
               
                setTransactionId(paymentIntent.id)

                const paymentData = {
                    email: user.email,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    propertyId:data.property_id ,
                    offerCardId:data._id,
                    price: price,

                }

                const response = await axiosPublic.post('/paymentHistory', paymentData)
            
                if (response.data?.modifiedCount===1) {
                 
                    Swal.fire("Payment Completed");
                    navigate('/dashBoard/myBoughtProperty')
                }
            }

        }


    }

    

    return (
        <div>
            <form onSubmit={handelForm} className=" flex flex-col gap-3" >
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="text-red-500">{errMsg}</div>
                {transactionId && <div className="text-green-500"> Your Transaction Id: {transactionId}</div>}
                <input disabled={!stripe || !clientSecret} className=" btn btn-primary m-auto btn-md w-6/12 " type="submit" value="PAY" />

            </form>
        </div>
    );
};

export default CheckOutForm;

CheckOutForm.propTypes = {
    propertyId: PropTypes.string
  };