import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";


const UpdateMovieDetails = () => {

    const axiosPublic = useAxiosPublic();
    const { movieId } = useParams(); // Assumes you're using React Router
    const [formData, setFormData] = useState({
        type: "Movie",
        title: "",
        genre: "",
        releaseDate: "",
        cast: "",
        director: "",
        duration: "",
        rating: "",
        description: "",
        youtubeLink: "",
    });

    const [video, setVideo] = useState(null);
    const [image, setImage] = useState(null);
    const [subtitle, setSubtitle] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Fetch existing movie details
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await axiosPublic.get(`/api/movies/movie/${movieId}`);
                const movie = res.data;
                setFormData({
                    type: movie.type || "Movie",
                    title: movie.title || "",
                    genre: movie.genre || "",
                    releaseDate: movie.releaseDate?.slice(0, 10) || "",
                    cast: movie.cast || "",
                    director: movie.director || "",
                    duration: movie.duration || "",
                    rating: movie.rating || "",
                    description: movie.description || "",
                    youtubeLink: movie.youtubeLink || "",
                });
            } catch (err) {
                console.error("Failed to fetch movie:", err);
            }
        };

        fetchMovie();
    }, [movieId, axiosPublic]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === "video") setVideo(files[0]);
        if (name === "image") setImage(files[0]);
        if (name === "subtitle") setSubtitle(files[0]);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "duration" && formData.type !== "Movie") return;
            data.append(key, value);
        });

        // Skipping file appends, so no update to video/image/subtitle
        // Don't include these fields: video, image, subtitle

        try {
            const res = await axiosPublic.patch(
                `/api/movies/updateMovie/${movieId}`,
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percent);
                    },
                }
            );

            if (res?.status === 200) {
                toast.success("Movie updated successfully!");
                setUploadProgress(0);
            }
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update movie.");
        }
    };

    console.log('Data form information', formData)

    return (
        <div>
            <h3 className="text-4xl text-center">Update Movie details</h3>

            <div className="my-10"></div>
            <form onSubmit={handleUpdateSubmit} className="space-y-6 bg-gray-900 p-6 rounded-lg shadow-md w-[80%] mx-auto">
                <h2 className="text-2xl font-semibold text-white mb-4">Update Movie</h2>
                <div>
                    <label className="block mb-1 text-sm text-gray-300">Movie Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter movie title"
                        className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-gray-300">Genre</label>
                    <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        placeholder="Genre (comma separated)"
                        className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-gray-300">Release Date</label>
                    <input
                        type="date"
                        name="releaseDate"
                        value={formData.releaseDate}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-gray-300">Cast</label>
                    <input
                        type="text"
                        name="cast"
                        value={formData.cast}
                        onChange={handleChange}
                        placeholder="Cast (comma separated)"
                        className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-gray-300">Director</label>
                    <input
                        type="text"
                        name="director"
                        value={formData.director}
                        onChange={handleChange}
                        placeholder="Director name"
                        className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {formData.type === "Movie" && (
                    <div>
                        <label className="block mb-1 text-sm text-gray-300">Duration (minutes)</label>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="Movie duration"
                            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                )}

                <div>
                    <label className="block mb-1 text-sm text-gray-300">Rating (0–10)</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        placeholder="Enter rating"
                        className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-gray-300">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Movie description"
                        className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        rows={4}
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-gray-300">YouTube Link</label>
                    <input
                        type="text"
                        name="youtubeLink"
                        value={formData.youtubeLink}
                        onChange={handleChange}
                        placeholder="Paste YouTube trailer link"
                        className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* File Uploads */}
                {/* <div className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm text-gray-300">Update Movie Poster</label>
                        <input
                            type="file"
                            id="imageInput"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full p-2 rounded bg-gray-800 text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-gray-300">Update Video</label>
                        <input
                            type="file"
                            id="videoInput"
                            name="video"
                            accept="video/*"
                            onChange={handleFileChange}
                            className="w-full p-2 rounded bg-gray-800 text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-gray-300">Update Subtitle</label>
                        <input
                            type="file"
                            id="subtitleInput"
                            name="subtitle"
                            accept=".srt,.vtt"
                            onChange={handleFileChange}
                            className="w-full p-2 rounded bg-gray-800 text-white"
                        />
                    </div>
                </div> */}

                {/* Upload Progress Bar */}
                {uploadProgress > 0 && (
                    <div className="w-full bg-gray-700 rounded-full h-4 mt-4">
                        <div
                            className="bg-blue-500 h-4 rounded-full transition-all"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                )}

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded w-full transition-colors"
                >
                    Update Movie
                </button>
            </form>


        </div>
    );
};

export default UpdateMovieDetails;