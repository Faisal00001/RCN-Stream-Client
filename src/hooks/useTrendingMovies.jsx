import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTrendingMovies = () => {
    const axiosPublic = useAxiosPublic()
    const { data: trendingMovies, isPending: trendingMoviesLoading } = useQuery({
        queryKey: ['trendingMovies'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/movies/trending`);
            return res.data;
        }
    })
    return [trendingMovies, trendingMoviesLoading]
};

export default useTrendingMovies;