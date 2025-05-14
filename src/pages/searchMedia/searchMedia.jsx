import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loader from "../../components/Loader/Loader";
import VideoCard from "../../components/VideoCard/VideoCard";
import Lottie from "lottie-react";
import noDataFound from "../../assets/animation/no-data-found.json";

const SearchMedia = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const axiosPublic = useAxiosPublic();

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query?.trim()) return;
            setLoading(true);
            try {
                const response = await axiosPublic.get(`/api/movies-and-tv-series/search?query=${query}`);
                setResults(response.data);
            } catch (error) {
                console.error('Search failed:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query, axiosPublic]);

    return (
        <div className="bg-[#0C0C0C] text-white min-h-screen flex flex-col items-center">
            <div className="container mx-auto px-2">
                <div className="mt-24">
                    <div>
                        <button className="bg-green-500 px-10 py-1.5 rounded">
                            Search results for {query}
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center mt-10">
                            <Loader />
                        </div>
                    ) : results.length === 0 ? (
                        <div className="h-[80vh] flex justify-center items-center">
                            <Lottie animationData={noDataFound} loop={true} />
                        </div>
                    ) : (
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {results.map((media, index) => (
                                <div key={index}>
                                    <VideoCard content={media} />
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default SearchMedia;
