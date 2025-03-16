import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosPublic";



const useMyList = (userId) => {
    const axiosSecure = useAxiosSecure()
    const { data: wishList, isPending: wishListPending, refetch } = useQuery({
        queryKey: [userId, 'wishList'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/wishlist/myList?userId=${userId}`);
            return res.data;
        }
    })
    return [wishList, wishListPending, refetch]
};

export default useMyList;