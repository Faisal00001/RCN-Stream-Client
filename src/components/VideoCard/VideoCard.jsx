import PropTypes from "prop-types";
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ content, handlePlayClick }) => {
    const navigate = useNavigate();
    const baseURL = "http://localhost:5000/";
    const imageUrl = content?.type === 'Movie'
        ? `${baseURL}${content.imagePath.replace(/\\/g, "/")}`
        : `${baseURL}${content.posterUrl.replace(/\\/g, "/")}`;

    const handleMovieDetails = () => {
        if (content?.type === 'Movie') {
            navigate(`/movieDetails/${content?._id}`);
        } else if (content?.type === 'TvSeries') {
            navigate(`/tvseriesDetails/${content?._id}`);
        }
    };

    return (
        <div
            onClick={handleMovieDetails}
            className="group relative cursor-pointer overflow-hidden rounded-2xl h-[360px] shadow-xl transform transition duration-500 hover:shadow-2xl"
        >
            {/* Background Image */}
            <img
                src={imageUrl}
                alt={content?.title}
                className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:brightness-75"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

            {/* Play Icon */}
            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                <FaPlayCircle className="text-white text-5xl drop-shadow-lg" />
            </div>

            {/* Title Text */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-center">
                    <h3 className="text-white text-lg font-semibold truncate">{content?.title}</h3>
                </div>
            </div>
        </div>
    );
};

VideoCard.propTypes = {
    content: PropTypes.object.isRequired,
    handlePlayClick: PropTypes.func.isRequired,
};

export default VideoCard;
