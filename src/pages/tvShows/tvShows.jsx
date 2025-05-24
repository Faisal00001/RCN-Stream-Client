import Loader from "../../components/Loader/Loader";
import VideoCard from "../../components/VideoCard/VideoCard";
import useGetAllTvShows from "../../hooks/useGetAllTvShows";


const TvShows = () => {
    const [allTvShows, allTvShowsPending] = useGetAllTvShows();
    if (allTvShowsPending) {
        return <Loader />
    }
    
    return (
        <div>
            <div className="bg-[#0C0C0C] text-white min-h-screen flex flex-col">
                <div className="mt-20 px-10">
                    <button className="bg-green-500 px-10 py-1.5 rounded">Popular Tv Shows</button>
                    <div className="mt-10">
                        <div className='grid grid-cols-4 gap-10'>
                            {
                                allTvShows ? (
                                    allTvShows.map((content, index) => {
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
        </div>
    );
};

export default TvShows;