
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import useTrendingMovies from '../../hooks/useTrendingMovies';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const AutoplaySlider = withAutoplay(AwesomeSlider);
const Featured = ({ type }) => {
    const navigate = useNavigate()
    const { baseURL } = useContext(AuthContext)
    const [trendingMovies, trendingMoviesLoading] = useTrendingMovies();
    if (trendingMoviesLoading) {
        return ""
    }
    const handleMovieDetails = (content) => {
        navigate(`/movieDetails/${content?._id}`)
    }
    return (
        <>
            <AutoplaySlider
                play={true}
                cancelOnInteraction={false} // should stop playing on user interaction
                interval={6000}
                bullets={false}
                organicArrows={false}
                buttons={false}
            >
                {
                    trendingMovies ?
                        trendingMovies.map((content, index) => {
                            const imageUrl = `${baseURL}${content.imagePath.replace(/\\/g, "/")}`;
                            return <div key={index}
                                style={{
                                    backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.91) 0%, rgba(0,0,0,0) 35%, rgba(40,40,60,0) 100%), url(${imageUrl})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                }}
                                className="h-[50rem] md:h-[55rem] lg:h-[65rem] bg-cover bg-center"
                            >


                                <div className="ml-2 mr-2 sm:mr-0 sm:ml-12 mt-[75%] sm:mt-52">
                                    <h1 className="text-white text-3xl font-semibold text-center mb-5 py-2 sm:text-left sm:text-5xl sm:border-l-8 pl-4 border-red-700 md:text-6xl lg:w-2/3 xl:w-1/2 sm:font-bold drop-shadow-lg">
                                        {content?.title}
                                    </h1>

                                    <div className="flex">
                                        <div className="hidden sm:flex justify-center sm:justify-start ml-2">
                                            <h1 className="flex text-white text-xl drop-shadow-lg 2xl:text-lg"></h1>
                                        </div>
                                        <div className="ml-2 hidden sm:flex justify-center sm:justify-start">
                                            <h1 className="flex text-white text-base font-bold drop-shadow-lg">
                                                19/11/13
                                            </h1>
                                        </div>
                                        <h1 className="hidden sm:flex text-white px-2 bg-[#1e1e1e89] border-2 border-stone-600 rounded ml-2">
                                            HD
                                        </h1>
                                    </div>

                                    <div className="mt-3 mb-4">
                                        <h1 className="text-white text-xl drop-shadow-xl text-center line-clamp-2 sm:line-clamp-3 sm:text-left w-full md:w-4/5 lg:w-8/12 lg:text-xl xl:w-5/12 2xl:text-2xl">
                                            {content?.description}
                                        </h1>
                                    </div>

                                    <div className="flex justify-center sm:justify-start">
                                        <button onClick={() => handleMovieDetails(content)}
                                            className="bg-red-800 hover:bg-red-900 transition duration-500 ease-in-out shadow-2xl flex items-center mb-3 mr-3 text-base sm:text-xl font-semibold text-white py-2 sm:py-2 px-10 sm:px-14 rounded-md"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6 mr-2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                                                />
                                            </svg>
                                            Play
                                        </button>
                                        <button
                                            className="bg-[#33333380] flex items-center shadow-2xl mb-3 text-base sm:text-xl font-semibold text-white hover:bg-white hover:text-black transition duration-500 ease-in-out py-2 px-8 rounded-md"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 items-center mr-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            More Info
                                        </button>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(hsl(0deg 0% 0% / 0%), hsl(0deg 0% 0% / 38%), hsl(0deg 0% 7%))",
                                        backgroundSize: "100% 100%",
                                    }}
                                    className="h-[50rem] md:h-[55rem] lg:h-[65rem] mt-auto w-full"
                                ></div>
                            </div>
                        })

                        : <></>
                }


            </AutoplaySlider>

        </>


    );
};

export default Featured;