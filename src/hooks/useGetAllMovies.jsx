import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useGetAllMovies = (page = 1, limit = 8) => {
    const axiosPublic = useAxiosPublic()
    const { data, isPending, refetch } = useQuery({
        queryKey: ['allMovies', page],
        queryFn: async () => {
            const res = await axiosPublic.get(`api/movies/all-movies?page=${page}&limit=${limit}`);

            return res.data;
        }
    })
    return [data?.movies || [], isPending, refetch, data?.totalPages || 1]
};

export default useGetAllMovies;