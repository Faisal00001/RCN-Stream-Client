import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";



const useAllCategories = () => {
    const axiosSecure = useAxiosSecure()
    const { data: allCategories, isPending: allCategoriesLoading } = useQuery({
        queryKey: ['allCategory'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/category/get-categories`);
            return res.data;
        }
    })
    return [allCategories, allCategoriesLoading]
};

export default useAllCategories;