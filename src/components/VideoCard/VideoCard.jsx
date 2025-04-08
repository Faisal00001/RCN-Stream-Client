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

            <div>
                <div onClick={() => handleMovieDetails(content)} className="relative cursor-pointer isolate flex flex-col justify-end overflow-hidden rounded px-8 pb-8 pt-40 w-[250px]  group h-[250px]">
                    <img
                        src={imageUrl}
                        alt="Media Image"
                        className="absolute inset-0 h-full w-full object-cover transition-all duration-300 group-hover:brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 transition-all duration-300 group-hover:from-black/70 group-hover:via-black/50" />

                    {/* Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                        <FaPlayCircle className="text-6xl text-white cursor-pointer" />
                    </div>

                    {/* Centered Text at Bottom */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
                        <h3 className="text-xl  text-white">{content?.title}</h3>

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