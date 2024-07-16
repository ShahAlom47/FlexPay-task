
import { useForm } from "react-hook-form";
import AuthenticationGIF from "../../../SharedComponents/AuthenticationGIF/AuthenticationGIF";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../../CustomHocks/useUser";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../../CustomHocks/useAxiosPublic";
import bcrypt from 'bcryptjs'; // bcryptjs যোগ করুন

const Register = () => {
    const [showPass, setShowPass] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [passErr, setPassErr] = useState('');
    const navigate = useNavigate();
    const { setToken } = useUser();

    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        setErrMsg('');
        setPassErr('');

        if (data.password.length < 5) {
            setPassErr('Password must be 5 characters or longer');
            return;
        } else if (isNaN(data.password)) {
            setPassErr('Password must contain only numbers');
            return;
        } else {
            setPassErr('');
            setErrMsg('');
            try {

                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(data.password, salt);

               
                axiosPublic.post('/addUser', { ...data, password: hashedPassword, role: 'pending',balance:0 })
                    .then(async (res) => {
                        console.log(res);
                        toast.success('User added successfully! Wait for admin confirmation.');
                        setToken(data)
                        const token = localStorage.getItem('token')
                        if (token) {
                            reset();
                            navigate('/');
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        setErrMsg('An error occurred. Please try again.');
                    });
            } catch (error) {
                console.log(error);
                setErrMsg('An error occurred during password hashing. Please try again.');
            }
        }
    };
    return (
        <div className="
        bg-[#8268df] py-10 ">
            <Helmet>
                <title>Register | SCash</title>
            </Helmet>
            <ToastContainer />
            <div className="max-w flex lg:flex-row md:flex-row flex-col items-center justify-center lg:p-6 md:p-5 my-6 ">

                <div className="md:w-1/2 lg:w-1/2 p-5">
                    <div className=" w-8/12 m-auto">
                        <AuthenticationGIF></AuthenticationGIF>
                    </div>

                </div>
                <div className="md:w-1/2 lg:w-1/2">
                    <div className=" w-11/12 m-auto bg-white rounded-md p-5 shadow-md shadow-black">
                        <h1 className="text-3xl font-bold text-center pb-3 border-b-4 rounded-full">Register</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex gap-3 flex-col items-center">


                            <label className="input input-bordered flex items-center gap-2 w-full rounded-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                <input type="text" className="grow" placeholder="Username" {...register("name", { required: true })} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 w-full rounded-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                <input type="email" className="grow" placeholder="Email" {...register("email", { required: true })} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 w-full rounded-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                <input type="number" className="grow" placeholder="Mobile" {...register("mobile", { required: true })} />
                            </label>
                            <label className="relative input input-bordered flex items-center gap-2 w-full rounded-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input type={showPass ? 'number' : 'password'} className="grow" placeholder="Password" {...register("password", { required: true })} />
                                <div onClick={() => setShowPass(!showPass)} className="absolute right-4 ">{showPass ? <FaEye /> : <FaEyeSlash />}</div>
                            </label>
                            <div className="w-full">
                                <p className="text-red-500">{passErr}</p>
                                <p className="text-red-500">{errMsg}</p>
                            </div>
                            <input className="btn btn-wide bg-[#56af27] hover:bg-[#4c9724] rounded-sm text-white" type="submit" />
                        </form>
                        <div className=" flex flex-col justify-center items-center">
                            <p className="font-semibold"> Already have account <Link to={'/login'}><button className="btn-link btn">Login</button></Link></p>

                            <div className="">

                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default Register;