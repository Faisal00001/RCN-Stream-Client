import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTrendingMovies = () => {
    const axiosPublic = useAxiosPublic()
    const { data, isPending: trendingMoviesLoading } = useQuery({
        queryKey: ['trendingMovies'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/movies/trending`);
            return res.data;
        }
    })
    const trendingMovies = data?.medias || data || [];
    const totalPages = data?.totalPages || 1;
    return [trendingMovies, totalPages, trendingMoviesLoading]
};

export default useTrendingMovies;