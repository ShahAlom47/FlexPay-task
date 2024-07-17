import { Helmet } from "react-helmet";
import AuthenticationGIF from "../../../SharedComponents/AuthenticationGIF/AuthenticationGIF";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link,  useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Login.css'

import { loadCaptchaEnginge, LoadCanvasTemplate } from 'react-simple-captcha';
import useUser from "../../../CustomHocks/useUser";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';





const Login = () => {
    const [showPass,setShowPass]=useState(false)
    const [errMsg,setErrMsg]=useState('')
    const [passErr,setPassErr]=useState('')
    const [emailErr,setEmailErr]=useState('')
    const {signIn}=useUser();
    const navigate=useNavigate()
    const {register, handleSubmit } = useForm()



    const onSubmit = async (data) => {
        setErrMsg('')
        setPassErr('')
        setEmailErr('')

        if(data.password.length<5){
            setPassErr('Password must be 5 characters or longer')
            return
        }
        else if (isNaN(data.password)) {
            setPassErr('Password must contain only numbers');
            return;
        }
        // else if(!data.captcha){
        //     setPassErr('')
        //     setErrMsg('Type the Captcha')
        //     return
        // }
        // else if(!validateCaptcha(data.captcha)){
        //     setPassErr('')
        //     setErrMsg('Captcha not matched')
        //     return
        // }
        else {
            setPassErr('');
            setErrMsg('');
            try {
                const res = await signIn(data.email, data.password);
                if (res && res.message === 'Login successful') {
                    toast.success('Login Success');
                    setTimeout(() => {
                        if (res.user.role === 'pending' || res.user.role === 'user') {
                            navigate("/userHome");
                        } else if (res.user.role === 'agent') {
                            navigate("/agentHome");
                        } else if (res.user.role ==='admin') {
                            navigate("/adminHome");
                        }
                        
                    }, 1500);
                }
                else {
                    setErrMsg(res.response.data.message)
                }

                               
            } catch (error) {
                console.error('Login error:', error);
                setErrMsg('An error occurred. Please try again.');
            }
        }
    };

    useEffect(() => {
        loadCaptchaEnginge(6); 
    }, []);
   

    return (
        <div className="bg-[#5e48ac] py-10 ">
        <Helmet>
            <title>Login</title>
        </Helmet>
        <ToastContainer />
        <div className="max-w flex lg:flex-row md:flex-row flex-col items-center justify-center lg:p-6 md:p-5 my-6 ">

            <div className="md:w-1/2 lg:w-1/2 p-5">
                <div className=" w-8/12 m-auto">
                    <AuthenticationGIF></AuthenticationGIF>
                </div>

            </div>
            <div className="md:w-1/2 lg:w-1/2">
                <div className=" lg:w-11/12 m-auto bg-white rounded-md p-5 shadow-md shadow-black">
                    <h1 className="text-3xl font-bold text-center pb-3 border-b-4 rounded-full">Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex gap-3 flex-col items-center">
                      
                      
                       
                        <label className="input input-bordered flex items-center gap-2 w-full rounded-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input type="email" className="grow" placeholder="Email" {...register("email", { required: true })}  />
                        </label>
                        <div className="w-full"> <p className="text-red-500">{emailErr}</p></div>
                        <label className="relative input input-bordered flex items-center gap-2 w-full rounded-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input type={showPass?'text':'password'} className="grow" placeholder="Password" {...register("password", { required: true })}  />
                            <div onClick={()=>setShowPass(!showPass)} className="absolute right-4 ">{showPass?<FaEye/>:<FaEyeSlash/>}</div>
                        </label>
                        <div className="w-full"> <p className="text-red-500">{passErr}</p></div>
                       
                        <label className=" input input-bordered flex flex-col  gap-2 w-full rounded-sm">
                        <input type="text" className="grow  " placeholder="Type here CAPTCHA" {...register("captcha")}  />
                        </label>
                      <div className="w-full">
                      <p className="text-red-500">{errMsg}</p>
                      </div>
                       <div className="flex justify-start w-full p-2">
                       <div className="border-2 p-2 bg-slate-300 rounded-sm">
                       <LoadCanvasTemplate  />
                       </div>
                       </div>
                       
          

                        <input className="btn btn-wide bg-[#56af27] hover:bg-[#4c9724] rounded-sm text-white" type="submit" value={'Login'} />
                    </form>
                    <div className=" flex flex-col justify-center items-center">
                    <p className="font-semibold"> Create a new account <Link to={'/register'}><button className="btn-link btn">Register</button></Link></p>
                    <div className="divider">OR</div>
                    
                    </div>
                </div>

            </div>


        </div>
    </div>
    );
};

export default Login;