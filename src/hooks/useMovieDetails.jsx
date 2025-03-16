import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useMovieDetails = (id) => {
    const axiosPublic = useAxiosPublic()
    const { data: movieInfo, isPending: movieInfoLoading } = useQuery({
        queryKey: [id, 'categoryWiseMovies'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/movies/movie/${id}`);
            return res.data;
        }
    })
    return [movieInfo, movieInfoLoading]
};

export default useMovieDetails;