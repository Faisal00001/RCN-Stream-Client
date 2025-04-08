import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useGetAllMovies = () => {
    const axiosPublic = useAxiosPublic()
    const { data: allMovies, isPending: allMoviesPending } = useQuery({
        queryKey: ['allMovies'],
        queryFn: async () => {
            const res = await axiosPublic.get(`api/movies/all-movies`);
            return res.data;
        }
    })
    return [allMovies, allMoviesPending]
};

export default useGetAllMovies;