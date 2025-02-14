import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from 'bcryptjs';
import bg from '../../../assets/features/common-bg.png'

const Register = () => {
    const [errMsg, setErrMsg] = useState('');
    const [passErr, setPassErr] = useState('');
    const navigate = useNavigate();

    const { register, handleSubmit, reset, watch } = useForm();

    // Watch the accountType to set isActive
    const accountType = watch("accountType");

    const onSubmit = async (data) => {
        setErrMsg('');
        setPassErr('');

        // Validate password
        if (data.password.length < 5) {
            setPassErr('Password must be 5 characters or longer');
            return;
        } else if (isNaN(data.password)) {
            setPassErr('Password must contain only numbers');
            return;
        } else {
            setPassErr('');
        }

        // Validate PIN
        if (data.pin.length !== 5 || isNaN(data.pin)) {
            setErrMsg('PIN must be a 5 digit number');
            return;
        }

        // Prepare the data for registration
        const userData = {
            name: data.name,
            pin: data.pin,
            mobile: data.mobile,
            email: data.email,
            accountType: data.accountType,
            nid: data.nid,
            balance: 0,  // Default balance can be set here
            isBlocked: false,  // Default values
            isDeleted: false,  // Default values
            isActive: accountType === "user" ? true : false, // Set isActive based on accountType
        };

        console.log(userData);

        try {
            // Hash the password before sending the data
            const hashedPassword = await bcrypt.hash(data.password, 10);
            userData.password = hashedPassword;

            // Call your API or function to create the user
            // Example: await axios.post('/register', userData);

            toast.success("Registration successful!");
            reset(); // Reset form after successful registration
            navigate('/login'); // Redirect to login page
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
                    <div className=" w-11/12 m-auto bg-gray-500 bg-opacity-30 rounded-lg p-5 shadow-md shadow-black">
                        <h1 className="text-3xl font-bold text-center pb-3 border-b-4 rounded-full">Register</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex gap-3 flex-col items-center">
                            <label className="input input-bordered flex items-center gap-2 w-full rounded-sm">
                                <input type="text" className="grow" placeholder="Username" {...register("name", { required: true })} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 w-full rounded-sm">
                                <input type="email" className="grow" placeholder="Email" {...register("email", { required: true })} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 w-full rounded-sm">

                                <input type="tel" className="grow" placeholder="Mobile" {...register("mobile", { required: true })} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 w-full rounded-sm">
                                <input type="tel" className="grow" placeholder="PIN" {...register("pin", { required: true })} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 w-full rounded-sm">
                                <input type="text" className="grow" placeholder="NID" {...register("nid", { required: true })} />
                            </label>

                            <label className="input input-bordered flex items-center gap-2 w-full rounded-sm">
                                <select  {...register("accountType", { required: true })} className="grow bg-transparent">
                                    <option value="user">User</option>
                                    <option value="agent">Agent</option>
                                </select>
                            </label>
                            <div className="w-full">
                                <p className="text-red-500">{passErr}</p>
                                <p className="text-red-500">{errMsg}</p>
                            </div>
                            <input className="btn w-full bg-[#271b8c] hover:bg-[#1d215a] rounded-sm text-white" type="Register" />
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
