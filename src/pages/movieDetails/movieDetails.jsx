import { useCallback, useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";

import { FaPlay } from "react-icons/fa";

import { AiFillLike } from "react-icons/ai";
import Footer2 from "../../components/Footer/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import useMovieDetails from "../../hooks/useMovieDetails";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const MovieDetails = () => {
    const navigate = useNavigate()
    const baseURL = "http://localhost:5000/";
    const axiosPublic = useAxiosPublic()
    const [loading, setLoading] = useState(false);
    const { userId } = useContext(AuthContext)
    const { id } = useParams()
    const [playing, setPlaying] = useState(false);
    const [movieInfo, movieInfoLoading] = useMovieDetails(id)
    const handleUpdateViews = useCallback(async () => {
        try {
            await axiosPublic.patch(`/api/movies/update-views/${id}`);
            console.log("Movie view count updated.");
        } catch (error) {
            console.error("Error updating views:", error);
        }
    }, [id, axiosPublic]);
    useEffect(() => {
        if (playing) {
            handleUpdateViews();
        }
    }, [playing, handleUpdateViews]); // Run only when playing state changes
    if (movieInfoLoading) {
        return <Loader />
    }
    const { imagePath, videoPath, subtitlePath, type } = movieInfo
    const imageUrl = `${baseURL}${imagePath.replace(/\\/g, "/")}`;
    const videoUrl = `${baseURL}${videoPath.replace(/\\/g, '/')}`;
    const subtitleUrl = `${baseURL}${subtitlePath.replace(/\\/g, '/')}`
    const handleAddToWishlist = async (movieId) => {
        if (!userId) {
            toast.error("Please log in to add items to your wishlist.");
            return;
        }
        setLoading(true);
        try {
            const response = await axiosPublic.post("/api/wishlist/add-to-wishlist", {
                userId,
                movieId
            });
            console.log(response)
            if (response.data.message === "Movie added to wishlist successfully" && response.status === 200) {
                toast.success("Movie added to wishlist!");
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }
    console.log(movieInfo)
    return (
        <div className="bg-[#0C0C0C] text-white min-h-screen flex flex-col items-center">

            <div className="container mx-auto px-2">
                <h3 className="mt-20 mb-5 font-extralight"><Link to={'/'} className="text-gray-300 cursor-pointer hover:text-green-500">Home</Link> <span className="px-2 text-gray-300">/</span> <span className="text-gray-300 cursor-pointer hover:text-green-500">{type === 'Movie' ? 'Movie' : 'TV Shows'}</span>  <span className="px-2 text-gray-300">/</span> <span className="text-white font-normal">{movieInfo?.title}</span></h3>
                <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-screen relative">
                    <ReactPlayer
                        url={videoUrl}
                        playing={playing}
                        controls
                        width="100%"
                        height="100%"
                        className="rounded-none shadow-xl overflow-hidden"
                        config={{
                            file: {
                                attributes: {
                                    crossOrigin: "anonymous"
                                },
                                tracks: [
                                    {
                                        kind: "subtitles",
                                        src: subtitleUrl,
                                        srcLang: "en",
                                        default: true
                                    }
                                ]
                            }
                        }}
                    />

                    {!playing && (
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
                            onClick={() => setPlaying(true)}
                        >
                            <FaPlay className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white opacity-80 hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    )}
                </div>
                {/* Tv Series info */}

            </div>
            {/* Movie Details Section */}
            <section
                className=" bg-cover  w-full bg-center object-contain flex flex-col p-5 sm:p-14 2xl:px-44 lg:flex-row lg:items-center lg:justify-between lg:gap-8 2xl:py-24"
                style={{
                    backgroundImage: `linear-gradient(90deg, #000000f0 0%, #000000e6 35%, #000000c3 100%), url(${imageUrl})`,
                }}
            >
                {/* Movie Details Text */}
                <div className="lg:w-[45%]">
                    <h1 className="text-white font-bold text-3xl mb-2">{movieInfo?.title}</h1>
                    <div className="text-neutral-400 mt-3">{movieInfo?.description}</div>
                    <div className="bg-neutral-600 w-full h-[0.1rem] my-5"></div>

                    {/* Movie Metadata */}
                    <div className="hidden lg:grid">
                        <h1 className="text-red-700">
                            Released on: <span className="text-white ml-1">{new Date(movieInfo?.releaseDate).toDateString()}</span>
                        </h1>
                        <h1 className="text-red-700">
                            Cast: <span className="text-white ml-1">{movieInfo?.cast.join(', ')}</span>
                        </h1>
                        <h1 className="text-red-700">
                            Director: <span className="text-white ml-1">{movieInfo?.director}</span>
                        </h1>
                        <h1 className="text-red-700">
                            Genres: <span className="text-white ml-2">{movieInfo?.genre.join(', ')}</span>
                        </h1>
                        <h1 className="text-red-700">
                            Rating: <span className="text-white ml-2">{movieInfo?.rating} / 10</span>
                        </h1>
                    </div>

                    {/* Buttons */}
                    <div className="hidden lg:flex lg:mt-3 items-center gap-5">
                        <button onClick={() => handleAddToWishlist(movieInfo?._id)} className="group flex items-center border-[0.7px] border-white text-white font-medium sm:font-semibold text-xs sm:text-lg lg:px-10 xl:font-bold py-3 rounded shadow hover:shadow-lg hover:bg-white hover:border-white hover:text-red-700 outline-none focus:outline-none mt-4 mb-3 ease-linear transition-all duration-150">
                            Add To My List
                        </button>
                        <div className="cursor-pointer">
                            <AiFillLike className="text-5xl text-white" />
                        </div>

                        {/* <button className="border-white text-white p-4 rounded-full border-2 sm:ml-4 text-xs sm:mt-4 sm:text-lg md:text-xl shadow hover:shadow-lg hover:bg-white hover:border-white hover:text-red-700 outline-none focus:outline-none mb-3 ease-linear transition-all duration-150">
                            Like
                        </button> */}
                    </div>
                    <button onClick={() => {
                        navigate('/')
                    }} className="group w-[260px] flex items-center justify-center  bg-red-600 border-white text-white font-medium sm:font-bold text-xs sm:mt-4 sm:px-12 sm:text-lg md:px-16 md:text-xl py-3 rounded shadow hover:shadow-lg hover:bg-white hover:border-white hover:text-red-700 outline-none focus:outline-none mb-3 ease-linear transition-all duration-150">
                        Back to Home
                    </button>
                </div>

                {/* Movie Poster */}
                <div className="flex justify-between">
                    <div className="lg:hidden">
                        <div>
                            <h1 className="text-red-700 text-sm leading-7 sm:text-lg sm:leading-9 lg:text-2xl lg:leading-10">
                                Released on: <span className="text-white ml-2">Release Date</span>
                            </h1>
                            <h1 className="text-red-700 text-sm leading-7 sm:text-lg sm:leading-9 lg:text-2xl lg:leading-10">
                                Language: <span className="text-white ml-2">Language</span>
                            </h1>
                            <h1 className="text-red-700 text-sm leading-7 sm:text-lg sm:leading-9 lg:text-2xl lg:leading-10">
                                Genres: <span className="text-white ml-2">Genre 1, Genre 2</span>
                            </h1>
                        </div>
                        <div>
                            <button className="group flex items-center justify-center w-full border-[0.7px] border-white text-white font-medium sm:font-bold text-xs sm:px-12 sm:text-lg md:px-16 sd:text-xl py-3 rounded shadow hover:shadow-lg hover:bg-white hover:border-white hover:text-red-700 outline-none focus:outline-none mt-4 mb-3 ease-linear transition-all duration-150">
                                Add To My List
                            </button>
                            <button className="group flex items-center justify-center w-full bg-red-600 border-white text-white font-medium sm:font-bold text-xs sm:mt-4 sm:px-12 sm:text-lg md:px-16 md:text-xl py-3 rounded shadow hover:shadow-lg hover:bg-white hover:border-white hover:text-red-700 outline-none focus:outline-none mb-3 ease-linear transition-all duration-150">
                                Back to Home
                            </button>
                        </div>
                    </div>
                    <img
                        src={imageUrl}
                        className=" rounded-sm lg:w-[30rem] ml-4 lg:ml-0"
                        alt="Movie Poster"
                    />
                </div>
            </section>

            {/* Similar Movies Section */}
            <section className="w-full ">
                <div className="flex flex-wrap justify-between bg-[#000000ac] ">
                    <div className="p-4 sm:p-14 2xl:px-44">
                        <h1 className="text-white text-4xl font-semibold my-10 border-l-4 border-red-800 pl-3">
                            Similar Movies
                        </h1>
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                            {/* Similar Movie Card */}
                            <div className="max-w-sm shadow mb-4">
                                <img
                                    src="https://m.media-amazon.com/images/M/MV5BMjQ2ODIyMjY4MF5BMl5BanBnXkFtZTgwNzY4ODI2NzM@._V1_.jpg"
                                    alt="Similar Movie"
                                    className="cursor-pointer"
                                />
                                <div className="p-1">
                                    <h5 className="mt-1 mb-2 text-xl sm:text-2xl font-bold tracking-tight text-white">
                                        Movie Title
                                    </h5>
                                    <div className="flex justify-between items-center text-white mb-1">
                                        <div className="flex items-center">
                                            <div className="flex sm:flex-col">
                                                <h1 className="text-green-500 text-xs lg:text-base">
                                                    85% match
                                                </h1>
                                                <h1 className="text-xs lg:text-base ml-2 sm:ml-0">
                                                    Release Date
                                                </h1>
                                            </div>
                                            <h1 className="hidden sm:grid py-1 px-2 border-2 border-gray-800 rounded-md ml-2">
                                                HD
                                            </h1>
                                        </div>
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-9 h-9 cursor-pointer hidden sm:grid"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="mb-3 font-normal text-stone-400 line-clamp-3 text-xs sm:text-base">
                                        Movie Overview
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <div className="w-full">
                <div className="bg-[#0C0C0C]">
                    <Footer2 />
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;

