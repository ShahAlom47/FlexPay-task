import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import bg from '../../../assets/features/common-bg.png';
import useUser from "../../../CustomHocks/useUser";

const Register = () => {
    const [errMsg, setErrMsg] = useState('');
    const [passErr, setPassErr] = useState('');
    const navigate = useNavigate();
    const { userRegister } = useUser();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        setErrMsg('');
        setPassErr('');

        // const pin = parseInt(data.pin, 10);
        // if (isNaN(pin)) {
        //     setPassErr("PIN must be a number.");
        //     return;
        // }

        const pin = String(data?.pin)
        // Prepare the data for registration
        const userData = {
            name: data.name,
            pin: pin,
            mobile: String(data.mobile),
            email: data.email,
            accountType: data.accountType,
            nid: data.nid,
        };
      
        try {
            const res = await userRegister(userData);
            console.log();
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                reset(); // Reset form after successful registration
                navigate('/login'); // Redirect to login page
            } else {
                setErrMsg(res?.data?.message || 'Registration failed.');
            }
        } catch (error) {
            console.log(error);
            setErrMsg('An error occurred during registration. Please try again.');
        }
    };

    return (
        <div
            className="bg-[#0e0d0e] relative pt-8"
            style={{ backgroundImage: `url(${bg})`, backgroundPosition: 'center top' }}
        >
            {/* Blur overlay */}
            <div className="absolute inset-0 bg-gray-900 bg-opacity-60 blur-3xl"></div>

            <Helmet>
                <title>Register | SCash</title>
            </Helmet>
            <ToastContainer />
            <div className="max-w z-20 relative min-h-screen flex items-center justify-center lg:p-6 md:p-5 my-6">

                <div className="md:w-1/2 lg:w-1/2 mx-auto">
                    <div className="w-11/12 m-auto bg-gray-500 bg-opacity-30 rounded-lg p-5 shadow-md shadow-black">
                        <h1 className="text-3xl font-bold text-center pb-3 border-b-4 rounded-full">Register</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex gap-3 flex-col items-center">
                            <input type="text" className="input input-bordered w-full rounded-sm" placeholder="Username" {...register("name", { required: true })} />
                            <input type="email" className="input input-bordered w-full rounded-sm" placeholder="Email" {...register("email", { required: true })} />
                            <input type="tel" className="input input-bordered w-full rounded-sm" placeholder="Mobile" {...register("mobile", { required: true })} />
                            <input type="number" className="input input-bordered w-full rounded-sm" placeholder="PIN" {...register("pin", { required: true })} />
                            <input type="text" className="input input-bordered w-full rounded-sm" placeholder="NID" {...register("nid", { required: true })} />

                            <select {...register("accountType", { required: true })} className="input input-bordered w-full rounded-sm bg-transparent">
                                <option value="User">User</option>
                                <option value="Agent">Agent</option>
                            </select>

                            <div className="w-full">
                                <p className="text-red-500">{passErr}</p>
                                <p className="text-red-500">{errMsg}</p>
                            </div>

                            <button className="btn w-full bg-stone-900 rounded-sm text-white" type="submit">Register</button>
                        </form>
                        <div className="flex flex-col justify-center items-center">
                            <p className="font-semibold">Already have an account? <Link to={'/login'}><button className="btn-link btn">Login</button></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
