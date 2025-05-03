import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useCategoryWiseMovies = (category) => {
    const axiosPublic = useAxiosPublic()
    // Determine API endpoint based on category
    const getApiEndpoint = (category) => {
        switch (category) {
            case 'Trending Movies':
                return '/api/movies/trending';
            case 'Trending Tv Shows':
                return '/api/tv-series/trending';
            case 'Latest Movies':
                return '/api/movies/latest-movies';
            case 'Latest Tv Seires':
                return '/api/tv-series/latest-tv-series';
            case 'upcoming':
                return '/api/movies/upcoming';
            default:
                return `/api/movies/movies/${category}`; // fallback
        }
    };
    const { data: categoryWiseMovies, isPending: categoryWiseMoviesLoading } = useQuery({
        queryKey: [category, 'categoryWiseMovies'],
        queryFn: async () => {
            const endpoint = getApiEndpoint(category);
            const res = await axiosPublic.get(endpoint);
            return res.data;
        },
        enabled: !!category, // ensures the query only runs if category is truthy
    });

    return [categoryWiseMovies, categoryWiseMoviesLoading];
};

export default useCategoryWiseMovies;