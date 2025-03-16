import PropTypes from "prop-types";


const VideoPlayer = ({ video }) => {
    const baseUrl = `http://localhost:5000/`
    const videoUrl = `${baseUrl}${video.videoPath.replace(/\\/g, '/')}`;

    return (
        <div>
            <h2>{video.title}</h2>
            <video controls width="600">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};
VideoPlayer.propTypes = {
    video: PropTypes.object.isRequired,
};
export default VideoPlayer;