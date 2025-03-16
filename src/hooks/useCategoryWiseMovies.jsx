import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useCategoryWiseMovies = (category) => {
    const axiosPublic = useAxiosPublic()
    const { data: categoryWiseMovies, isPending: categoryWiseMoviesLoading } = useQuery({
        queryKey: [category, 'categoryWiseMovies'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/movies/movies/${category}`);
            return res.data;
        }
    })
    return [categoryWiseMovies, categoryWiseMoviesLoading]
};

export default useCategoryWiseMovies;