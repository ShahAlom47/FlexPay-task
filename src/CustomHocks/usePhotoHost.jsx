import useAxiosPublic from "./useAxiosPublic";

const imgHostingKey = import.meta.env.VITE_IMG_KEY
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`

const usePhotoHost = () => {
    const axiosPublic = useAxiosPublic()


    const handelHost = async (imageFile) => {
        const res = await axiosPublic.post(imgHostingApi, imageFile, {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: false
        })

        return res.data
    }
    return [handelHost]
};

export default usePhotoHost;