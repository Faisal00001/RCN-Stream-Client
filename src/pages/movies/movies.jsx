import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import hooks
import Footer2 from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import VideoCard from "../../components/VideoCard/VideoCard";
import useGetAllMovies from "../../hooks/useGetAllMovies";
import { GrChapterPrevious, GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { GrChapterNext } from "react-icons/gr";

const Movies = () => {
    const navigate = useNavigate();  // Hook to change the URL
    const location = useLocation();  // Hook to read the current URL

    // Extract page from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get("page")) || 1;  // Default to 1 if not found

    const limit = 8;  // Set a fixed limit internally

    const [page, setPage] = useState(initialPage);
    const [allMovies, allMoviesPending, , totalPages] = useGetAllMovies(page, limit);

    // Update the URL whenever the page changes (without limit in the URL)
    useEffect(() => {
        navigate(`?page=${page}`, { replace: true });
    }, [page, navigate]);

    // Pagination handlers
    const handleFirstPage = () => {
        if (page > 1) setPage(1);
    }
    const handlePrev = () => {
        if (page > 1) setPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(prev => prev + 1);
    };

    if (allMoviesPending) {
        return <Loader />;
    }
    const handleLastPage = () => {
        if (page < totalPages) setPage(totalPages);
    }
    return (
        <>
            <div className="bg-[#0C0C0C] text-white min-h-screen flex flex-col">
                <div className="my-20 px-10">
                    <button className="bg-green-500 px-10 py-1.5 rounded mt-10">Popular movies</button>
                    <div className="mt-16 mb-10">
                        {/* Pagination Controls */}
                        <div className="mb-4 flex justify-center space-x-4" aria-label="Pagination">
                            <button
                                onClick={handleFirstPage}
                                disabled={page === 1}
                                className={`rounded-lg cursor-pointer border border-green-500 px-3 py-2 text-gray-400 ${page === 1 && 'hidden'}`}
                            >
                                <span className="sr-only">First page</span>
                                <GrChapterPrevious className="mt-0.5 text-sm" />
                            </button>
                            <button
                                onClick={handlePrev}
                                disabled={page === 1}
                                className="rounded-lg cursor-pointer border border-green-500 px-3 py-2 text-gray-400"
                            >
                                <span className="sr-only">Previous</span>
                                <GrFormPreviousLink className="mt-0.5 text-lg" />
                            </button>

                            {/* Page buttons */}
                            {[...Array(totalPages).keys()].map(num => (
                                <button
                                    key={num}
                                    onClick={() => setPage(num + 1)}
                                    className={`rounded-lg border border-green-500 px-4 py-2 ${page === num + 1 ? "bg-green-500 text-white" : "text-gray-400"}`}
                                >
                                    {num + 1}
                                </button>
                            ))}

                            <button
                                onClick={handleNext}
                                disabled={page === totalPages}
                                className="rounded-lg border border-green-500 px-3 py-2 text-gray-400"
                            >
                                <span className="sr-only">Next</span>
                                <GrFormNextLink className="mt-0.5 text-lg" />
                            </button>
                            <button
                                onClick={handleLastPage}
                                disabled={page === totalPages}
                                className={`rounded-lg border border-green-500 px-3 py-2 text-gray-400 ${page === totalPages && "hidden"}`}
                            >
                                <span className="sr-only">Last page</span>
                                <GrChapterNext className="mt-0.5 text-sm" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className='grid grid-cols-4 gap-10'>
                            {allMovies ? (
                                allMovies.map((content, index) => (
                                    <div key={index}>
                                        <VideoCard content={content} />
                                    </div>
                                ))
                            ) : (
                                <p className='text-red-500 text-2xl'>No content available for this category.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer2 />
        </>
    );
};

export default Movies;
