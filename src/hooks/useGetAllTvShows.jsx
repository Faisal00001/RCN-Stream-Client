import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useGetAllTvShows = () => {
    const axiosPublic = useAxiosPublic()
    const { data: allTvShows, isPending: allTvShowsPending } = useQuery({
        queryKey: ['allTvShows'],
        queryFn: async () => {
            const res = await axiosPublic.get(`api/tv-series/all-tvseries`);
            return res.data;
        }
    })
    return [allTvShows, allTvShowsPending]
};

export default useGetAllTvShows;