import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loader from "../../../components/Loader/Loader";
import useAllCategories from "../../../hooks/useAllCategories";

const AddMovies = () => {
    const axiosPublic = useAxiosPublic();
    const [allCategories, allCategoriesLoading] = useAllCategories()

    const [formData, setFormData] = useState({
        category: "",
        title: "",
        description: "",
        youtubeLink: "",
    });
    const [video, setVideo] = useState(null);
    const [image, setImage] = useState(null);
    const [subtitle, setSubtitle] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    if (allCategoriesLoading) {
        return <Loader />
    }
    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle file selection
    const handleFileChange = (e) => {
        if (e.target.name === "video") {
            setVideo(e.target.files[0]);
        } else if (e.target.name === "image") {
            setImage(e.target.files[0]);
        }
        else if (e.target.name === 'subtitle') {
            setSubtitle(e.target.files[0])
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure both video and image files are selected
        if (!video || !image || !subtitle) {
            alert("Please select a video, an image, and a subtitle file.");
            return;
        }

        const data = new FormData();
        data.append("category", formData.category);
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("youtubeLink", formData.youtubeLink);
        data.append("video", video);
        data.append("image", image);
        data.append('subtitle', subtitle);

        try {
            const res = await axiosPublic.post(
                "http://localhost:5000/api/movies/upload-movie",
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted);
                    },
                }
            );

            if (res?.status === 201) {
                alert("Movie uploaded successfully!");
                setFormData({
                    category: "",
                    title: "",
                    description: "",
                    youtubeLink: "",
                });
                setVideo(null);
                setImage(null);
                setSubtitle(null); // Reset subtitle state
                document.getElementById("videoInput").value = "";
                document.getElementById("imageInput").value = "";
                document.getElementById("subtitleInput").value = "";
            }
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Failed to upload movie.");
        }
    };
    return (
        <div>
            <div className="p-6 bg-gray-900 text-white max-w-lg mx-auto rounded-lg mt-28">
                <h2 className="text-2xl font-bold mb-4">Upload a Movie</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full  bg-gray-800 select"
                        required
                    >
                        <option value="" disabled>Select a Category</option>
                        {allCategories?.categories.map((item, index) => (
                            <option key={index} value={item?.category}>
                                {item?.category}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="title"
                        placeholder="Movie Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-800 text-white"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-800 text-white"
                        required
                    />
                    <input
                        type="text"
                        name="youtubeLink"
                        placeholder="YouTube Link"
                        value={formData.youtubeLink}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-800 text-white"
                    />

                    {/* Image Upload Field */}
                    <label className="block mb-2 text-sm font-medium text-white">
                        Upload Movie Poster
                    </label>
                    <input
                        type="file"
                        id="imageInput"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full bg-gray-700 file-input"
                        required
                    />

                    {/* Video Upload Field */}
                    <label className="block mb-2 text-sm font-medium text-white">
                        Upload Video
                    </label>
                    <input
                        type="file"
                        id="videoInput"
                        name="video"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="w-full bg-gray-700 file-input"
                        required
                    />
                    <label className="block mb-2 text-sm font-medium text-white">
                        Upload Subtitle
                    </label>
                    <input
                        type="file"
                        id="subtitleInput"
                        name="subtitle"
                        accept=".srt,.vtt"
                        onChange={handleFileChange}
                        className="w-full bg-gray-700 file-input"
                        required
                    />
                    {/* Progress Bar */}
                    {uploadProgress > 0 && (
                        <div className="w-full bg-gray-700 rounded-full h-4 mt-4">
                            <div
                                className="bg-blue-500 h-4 rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full"
                    >
                        Upload Movie
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMovies;
