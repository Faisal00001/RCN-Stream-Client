import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useCategoryMedia = (category, page = 1, limit = 8) => {
    const axiosPublic = useAxiosPublic()
    // Determine API endpoint based on category
    const getApiEndpoint = (category) => {
        switch (category) {
            case 'Trending Movies':
                return `/api/movies/trending?page=${page}&limit=${limit}`;
            case 'Trending Tv Shows':
                return `/api/tv-series/trending?page=${page}&limit=${limit}`;
            case 'Latest Movies':
                return `/api/movies/latest-movies?page=${page}&limit=${limit}`;
            case 'Latest Tv Seires':
                return `/api/tv-series/latest-tv-series?page=${page}&limit=${limit}`;
            case 'upcoming':
                return '/api/movies/upcoming';
            default:
                return `/ api / movies / movies / ${category} `; // fallback
        }
    };
    const { data, isPending: categoryWiseMediaLoading } = useQuery({
        queryKey: [category, 'categoryWiseMedia', page],
        queryFn: async () => {
            const endpoint = getApiEndpoint(category);
            const res = await axiosPublic.get(endpoint);
            return res.data;
        },
        enabled: !!category, // ensures the query only runs if category is truthy
        keepPreviousData: true,
    });
    const categoryWiseMedia = data?.medias || data || [];
    const totalPages = data?.totalPages || 1;


    return [categoryWiseMedia, totalPages, categoryWiseMediaLoading];
};

export default useCategoryMedia;