import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useUser from "./useUser";


const useUserRole = () => {
    const axiosSecure=useAxios()
    const {user}=useUser()

   

    const { data, error, isLoading, refetch,isPending } = useQuery({
        queryKey: ['userRoles', user?.email],
        queryFn: async () => {
            if (!user || !user.email) {
                throw new Error('User is not logged in or user email is missing');
            }
            if(user){
                const res = await axiosSecure.get(`/user/role/${user.email}`);
            return res?.data?.userRole || 'user'; 
            }
        },
        enabled: !!user?.email,
    });

    return { data, error, isLoading, refetch ,isPending};
};

export default useUserRole;