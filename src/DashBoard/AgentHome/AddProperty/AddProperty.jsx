import { useForm } from "react-hook-form";
import useUser from "../../../CustomHocks/useUser";
import usePhotoHost from "../../../CustomHocks/usePhotoHost";
import useAxios from "../../../CustomHocks/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useUserRole from "../../../CustomHocks/useUserRole";
import { useMutation } from "@tanstack/react-query";


const AddProperty = () => {

    const { user } = useUser()
    const [handelHost] = usePhotoHost();
    const { data: userRole } = useUserRole()
    const axiosSecure = useAxios()
    const navigate = useNavigate()

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const addPropertyMutation = useMutation({
        mutationFn: async (propertyData) => {
            const res = await axiosSecure.post('/addProperty', propertyData)
            return res.data
        }
    })


    const onSubmit = async (data) => {
      
        if (userRole === 'fraud') {
            Swal.fire("You can not  add property ")
            return
        }

        const imageFile = { image: data.property_image[0] }
        const res = await handelHost(imageFile)
      


        if (res.success) {
            const propertyData = {
                title: data.title,
                description: data.description,
                max_price: data.max_price,
                min_price: data.min_price,
                agent_name: user.displayName,
                agent_photo: user.photoURL,
                agent_email: user.email,
                property_image: res.data.display_url,
                property_location: data.property_location,
                verification_status: 'pending',
                property_type: data.property_type,
                bedrooms: data.bedrooms,
                bathrooms: data.bathrooms,
                square_feet: data.square_feet,
                year_built: data.year_built,
            }

            addPropertyMutation.mutate(propertyData,{
                onSuccess:async()=>{
                    reset();
                        Swal.fire({
                            title: "Added property successfully",
        
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "My Added Property"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate('/dashBoard/myAddedProperty')
                            }
                        });
        
                }
            })



            // const response = await axiosSecure.post('/addProperty', propertyData)
            // if (response.data.insertedId) {
            //     reset();
            //     Swal.fire({
            //         title: "Added property successfully",

            //         showCancelButton: true,
            //         confirmButtonColor: "#3085d6",
            //         cancelButtonColor: "#d33",
            //         confirmButtonText: "My Added Property"
            //     }).then((result) => {
            //         if (result.isConfirmed) {
            //             navigate('/dashBoard/myAddedProperty')
            //         }
            //     });

            // }


       
        }

    }

    return (
        <div className="p-8 ">
            <div className=" border-b-2 pb-3">
                <h1 className="text-3xl font-bold">Add Property</h1>
            </div>
            <div className=" my-4">

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">


                    <div className="flex gap-3">

                        <label className={`input input-bordered flex items-center   gap-2 w-full  `}>
                            <input  {...register("title", { required: true })} type="text" placeholder="Title" className={` outline-none w-full `} />
                        </label>
                        <label className={`input input-bordered flex items-center   gap-2 w-full  `}>
                            <input  {...register("property_location", { required: true })} type="text" placeholder="location" className={` outline-none w-full `} />
                        </label>

                    </div>
                    <div className="flex gap-3">

                        <label className={`input input-bordered flex items-center   gap-2 w-full  `}>
                            <input  {...register("property_type", { required: true })} type="text" placeholder="Property type" className={` outline-none w-full `} />
                        </label>
                        <label className={`input input-bordered flex items-center   gap-2 w-full  py-1 pr-0 `}>
                            Price:
                            <input  {...register("max_price", { required: true })} type="text" placeholder="max price" className={`input input-bordered outline-none w-full `} />
                            <input  {...register("min_price", { required: true })} type="text" placeholder="min Price " className={`input input-bordered outline-none w-full `} />
                        </label>

                    </div>

                    <div className="flex gap-3">

                        <label className={`input input-bordered flex items-center   gap-2 w-full  `}>
                            <input  {...register("bathrooms", { required: true })} type="number" placeholder="Bathrooms" className={` outline-none w-full `} />
                        </label>
                        <label className={`input input-bordered flex items-center   gap-2 w-full  `}>
                            <input  {...register("bedrooms", { required: true })} type="number" placeholder="Bedrooms " className={` outline-none w-full `} />
                        </label>

                    </div>
                    <div className="flex gap-3">

                        <label className={`input input-bordered flex items-center   gap-2 w-full  `}>
                            <input  {...register("square_feet", { required: true })} type="number" placeholder="Size" className={` outline-none w-full `} />
                        </label>
                        <label className={`input input-bordered flex items-center   gap-2 w-full  `}>
                            <input  {...register("year_built", { required: true })} type="number" placeholder="Year built " className={` outline-none w-full `} />
                        </label>

                    </div>
                    <div className="flex gap-3">

                        <label className={`input input-bordered flex items-center   gap-2 w-full  `}>
                            <h1><span className=" font-semibold">Agent Name:</span> {user.displayName}</h1>
                        </label>
                        <label className={`input input-bordered flex items-center   gap-2 w-full  `}>
                            <h1><span className=" font-semibold">Agent Email:</span> {user.email}</h1>
                        </label>


                    </div>

                    <label className={`input input-bordered flex items-center   gap-2 w-full  `}>

                        <input  {...register("property_image", { required: true })} type="file" className="" />
                    </label>

                    <textarea {...register("description", { required: true })} placeholder="Description" rows={5} className="input input-bordered flex items-center   gap-2 w-full h-20" ></textarea>





                    {errors.exampleRequired && <span>This field is required</span>}

                    <input className=" my-5 btn btn-neutral w-full" type="submit" value={'Add Property'} />
                </form>



            </div >
        </div >

    );
};

export default AddProperty;