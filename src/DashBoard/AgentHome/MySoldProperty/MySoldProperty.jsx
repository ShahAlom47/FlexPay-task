import { Helmet } from "react-helmet";
import useAxios from "../../../CustomHocks/useAxios";
import { useQuery } from "@tanstack/react-query";
import useUser from "../../../CustomHocks/useUser";
import LoadingRing from "../../../SharedComponents/LoadingRing/LoadingRing";
import { ResponsiveTable } from "responsive-table-react";


const MySoldProperty = () => {

    const axiosSecure = useAxios();
    const {user}=useUser();

    const { data, isLoading } = useQuery({
        queryKey: ['soldProperty'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/soldProperty/${user.email}`);
            return res.data;
        }
    });

 

    const totalPrice =data?.reduce((acc, curr) => acc + parseFloat(curr.price), 0);


    const columns = [
        {
            "id": "title",
            "text": "Title"
        },
        {
            "id": "location",
            "text": "Location"
        },
        {
            "id": "buyer",
            "text": "Buyer Name"
        },
        {
            "id": "buyerEmail",
            "text": "Buyer Email"
        },
        {
            "id": "price",
            "text": "Price "
        },
      
      
       
    ];

    const tableData = data ? data.map(item => ({
        title: item.property_title,
        location: item.property_location,
        buyer: item.buyer_name,
        buyerEmail: item.buyer_email,
        price: item.price,
       
    })) : [];

    return (
        <div className="p-8">
        <Helmet>
           <title>HONEST || Dashboard || Sold Property</title>
       </Helmet>
       <div className="border-b-2 pb-3">
           <h1 className="text-3xl font-bold">Sold Properties</h1>
           <h1 className="text-lg my-3 font-bold">Total sold Amount: $ {totalPrice}</h1>
       </div>

       {
           isLoading ? <LoadingRing /> :
               <div className='adminProperty my-6'>
                   <ResponsiveTable columns={columns} data={tableData} />
               </div>
       }
   </div>
    );
};

export default MySoldProperty;