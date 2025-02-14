import axios from "axios";

const axiosPublic=axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://s-cash-server.vercel.app',

  withCredentials: true,
})

const useAxiosPublic = () => {
   return axiosPublic;
};

  export default useAxiosPublic;