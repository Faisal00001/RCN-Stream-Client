import PropTypes from "prop-types";
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const VideoCard = ({ content, handlePlayClick }) => {

    const navigate = useNavigate()
    const baseURL = "http://localhost:5000/";
    const imageUrl = `${baseURL}${content.imagePath.replace(/\\/g, "/")}`;
    const handleMovieDetails = (content) => {
        navigate(`/movieDetails/${content?._id}`)
    }

    console.log(imageUrl)
    return (
        <>

<div className="flex max-w-sm w-full bg-gray-800 shadow-md rounded-lg overflow-hidden h-[550px]">
                <div className="w-2 bg-gray-800"></div>

                <div
                    className="overflow-hidden rounded-xl relative transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white movie-card"
                    data-movie-id="438631"
                >
                    <div className="absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black via-gray-900 to-transparent"></div>

                    <div
                        className="relative cursor-pointer group z-10 px-10 pt-10 space-y-6 movie_info"
                        data-lity=""
                    >
                        <div className="poster__info align-self-end w-full">
                            <div className="h-32"></div>
                            <div className="space-y-6 detail_info">
                                <div className="flex flex-col space-y-2 inner">
                                    <div onClick={() => handlePlayClick(`${content.youtubeLink}`)}
                                        className="relative flex items-center w-min flex-shrink-0 p-1 text-center text-white bg-red-500 rounded-full group-hover:bg-red-700"
                                        data-unsp-sanitized="clean"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-10 h-10"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664l-3-2z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <div className="absolute transition opacity-0 duration-500 ease-in-out transform group-hover:opacity-100 group-hover:translate-x-16 text-xl font-bold text-white group-hover:pr-2">
                                            Trailer
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">{content?.title}</h3>
                                    {/* <div className="mb-0 text-lg text-gray-400">
                                            Beyond fear, destiny awaits.
                                        </div> */}
                                </div>

                                <div className="flex flex-row justify-between datos">
                                    <div className="flex flex-col datos_col">
                                        <div className="popularity">440.052</div>
                                        <div className="text-sm text-gray-400">Popularity:</div>
                                    </div>
                                    <div className="flex flex-col datos_col">
                                        <div className="release">2021-09-15</div>
                                        <div className="text-sm text-gray-400">Release date:</div>
                                    </div>
                                    <div className="flex flex-col datos_col">
                                        <div className="release">155 min</div>
                                        <div className="text-sm text-gray-400">Runtime:</div>
                                    </div>
                                </div>

                                <div className="flex flex-col overview">
                                    <div className="flex flex-col"></div>
                                    <div className="text-xs text-gray-400 mb-2">Overview:</div>
                                    <p className="text-xs text-gray-100 mb-6">
                                        {content?.description.length > 100 ? content?.description.slice(0, 100) + "..." : content?.description}
                                    </p>
                                </div>
                            </div>

                            {/* <div
                                    data-countdown="2021-09-15"
                                    className="absolute inset-x-0 top-0 pt-5 w-full mx-auto text-2xl uppercase text-center drop-shadow-sm font-bold text-white"
                                >
                                    00 Days 00:00:00
                                </div> */}
                        </div>
                    </div>

                    <img
                        className="absolute inset-0 transform w-full -translate-y-4 "
                        src={imageUrl}
                        style={{ filter: "grayscale(0)" }}
                        alt="Dune"
                    />

                    <div onClick={() => handleMovieDetails(content)} className="poster__footer flex flex-row absolute bottom-0 w-full pb-4 space-x-4 z-10 cursor-pointer justify-center">
                        <div
                            className="flex items-center py-2 px-4 rounded-full mx-auto text-white bg-red-500 hover:bg-red-700"
                            href="http://www.google.com/calendar/event?action=TEMPLATE&dates=20210915T010000Z%2F20210915T010000Z&text=Dune%20-%20Movie%20Premiere&location=http%3A%2F%2Fmoviedates.info&details=This%20reminder%20was%20created%20through%20http%3A%2F%2Fmoviedates.info"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaPlayCircle />
                            <div className="text-sm text-white ml-2">Watch</div>
                        </div>
                    </div>
                </div>
            </div>



        </>

    );
};
VideoCard.propTypes = {
    content: PropTypes.object.isRequired,
    handlePlayClick: PropTypes.func.isRequired
};
export default VideoCard;