import { useLocation, useNavigate, useParams } from "react-router-dom";
import useSingleProperty from "../../../../CustomHocks/useSingleProperty";
import LoadingRing from "../../../../SharedComponents/LoadingRing/LoadingRing";
import { useForm } from "react-hook-form";
import useUser from "../../../../CustomHocks/useUser";
import { useEffect, useState } from "react";
import usePhotoHost from "../../../../CustomHocks/usePhotoHost";
import useAxios from "../../../../CustomHocks/useAxios";
import Swal from "sweetalert2";

const EditForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useUser();
    const { data, isLoading } = useSingleProperty(id);
    const [handelHost] = usePhotoHost();
    const axiosSecure = useAxios()
    const [imagePreview, setImagePreview] = useState(null);


    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            description: '',
            title: '',
            property_location: '',
            property_type: '',
            max_price: '',
            min_price: '',
            bathrooms: '',
            bedrooms: '',
            square_feet: '',
            year_built: ''
        }
    });

    useEffect(() => {
        if (data) {
            reset({
                description: data.description,
                title: data.title,
                property_location: data.property_location,
                property_type: data.property_type,
                max_price: data.max_price,
                min_price: data.min_price,
                bathrooms: data.bathrooms,
                bedrooms: data.bedrooms,
                square_feet: data.square_feet,
                year_built: data.year_built,
                image: data.image
            });
            setImagePreview(data.property_image);
        }
    }, [data, reset]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setValue('image', file);
        }
    };

    const onSubmit = async data => {
        let updatedImageUrl = imagePreview;
       

        if (data.property_image && data.property_image[0]) {

            const imageFile = { image: data.property_image[0] };
            const res = await handelHost(imageFile);
            if (res.success) {
                updatedImageUrl = res.data.display_url;

            }


           
        }

        const updatedData = {
            title: data.title,
            description: data.description,
            max_price: data.max_price,
            min_price: data.min_price,
            agent_name: user.displayName,
            agent_photo: user.photoURL,
            agent_email: user.email,
            property_image: updatedImageUrl,
            property_location: data.property_location,
            verification_status: 'pending',
            property_type: data.property_type,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            square_feet: data.square_feet,
            year_built: data.year_built,
        };

        const res = await axiosSecure.patch(`/updateProperty/${id}`, updatedData)
        const result = res.data;
        if (result.modifiedCount == 1) {
           
            Swal.fire({
                title: " Property update  successfully",

                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(location.state)
                }
            });


        }




     
    };

    if (isLoading) {
        return <LoadingRing />;
    }

    return (
        <div className="p-8">
            <div className="border-b-2 pb-3">
                <h1 className="text-3xl font-bold">Edit Property</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="flex gap-3">
                        <label className="input input-bordered flex items-center gap-2 w-full">
                            <input defaultValue={data?.title} {...register("title", { required: true })} type="text" placeholder="Title" className="outline-none w-full" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 w-full">
                            <input defaultValue={data?.property_location} {...register("property_location", { required: true })} type="text" placeholder="Location" className="outline-none w-full" />
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <label className="input input-bordered flex items-center gap-2 w-full">
                            <input defaultValue={data?.property_type} {...register("property_type", { required: true })} type="text" placeholder="Property Type" className="outline-none w-full" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 w-full pr-0">
                            Price:
                            <input defaultValue={data?.min_price} {...register("min_price", { required: true })} type="text" placeholder="Price: $400 - $600" className=" input input-bordered outline-none w-full" />
                            <input defaultValue={data?.max_price} {...register("max_price", { required: true })} type="text" placeholder="Price: $400 - $600" className=" input input-bordered outline-none w-full" />
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <label className="input input-bordered flex items-center gap-2 w-full">
                            <input defaultValue={data?.bathrooms} {...register("bathrooms", { required: true })} type="number" placeholder="Bathrooms" className="outline-none w-full" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 w-full">
                            <input defaultValue={data?.bedrooms} {...register("bedrooms", { required: true })} type="number" placeholder="Bedrooms" className="outline-none w-full" />
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <label className="input input-bordered flex items-center gap-2 w-full">
                            <input defaultValue={data?.square_feet} {...register("square_feet", { required: true })} type="number" placeholder="Size" className="outline-none w-full" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 w-full">
                            <input defaultValue={data?.year_built} {...register("year_built", { required: true })} type="number" placeholder="Year Built" className="outline-none w-full" />
                        </label>
                    </div>
                    <textarea {...register("description", { required: true })} placeholder="Description" rows={5} className="input input-bordered flex items-center gap-2 w-full h-20"></textarea>
                    {imagePreview && <img src={imagePreview} alt="Property" width="200" />}
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <input {...register("property_image")} type="file" onChange={handleImageChange} className="" />
                    </label>
                    {errors.exampleRequired && <span>This field is required</span>}
                    <input className="my-5 btn btn-neutral w-full" type="submit" value="Update Property" />
                </form>
            </div>
        </div>
    );
};

export default EditForm;
