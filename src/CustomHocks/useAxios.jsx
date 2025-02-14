

import axios from "axios";
import { useNavigate } from "react-router-dom";



import { useContext, useEffect } from "react";

import { AuthContext } from "../AuthProvider/AuthProvider";






const axiosSecure = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://s-cash-server.vercel.app',
  withCredentials: true,
});

const useAxios = () => {
  const {  logout} = useContext(AuthContext)
 
  const navigate = useNavigate()


  useEffect(() => {

    axiosSecure.interceptors.request.use(function (config) {
      const token= localStorage.getItem('token')
      config.headers.authorization=`bearer ${token}`
      return config;
    },
     function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      const status= error.response?.status
      console.log(error);
      if(status===401|| status===403){
        logout()
        .then(()=>{
          navigate('/login')
        })
        
      }
      return Promise.reject(error);
    });
  
  }, [navigate, logout])
  return axiosSecure
};

export default useAxios;