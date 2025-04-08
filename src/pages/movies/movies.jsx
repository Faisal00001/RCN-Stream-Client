import Loader from "../../components/Loader/Loader";
import VideoCard from "../../components/VideoCard/VideoCard";
import useGetAllMovies from "../../hooks/useGetAllMovies";

const Movies = () => {
    const [allMovies, allMoviesPending] = useGetAllMovies();
    if (allMoviesPending) {
        return <Loader />
    }

    return (
        <div className="bg-[#0C0C0C] text-white min-h-screen flex flex-col">
            <div className="mt-20 px-10">
                <button className="bg-green-500 px-10 py-1.5 rounded">Popular movies</button>
                <div className="mt-10">
                    <div className='grid grid-cols-4 gap-10'>
                        {
                            allMovies ? (
                                allMovies.map((content, index) => {
                                    return (

                                        <div key={index} >
                                            <VideoCard content={content} />
                                        </div>


                                    );
                                })
                            ) : (
                                <p className='text-red-500 text-2xl'>No content available for this category.</p> // Display this message if no movies are found
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movies;