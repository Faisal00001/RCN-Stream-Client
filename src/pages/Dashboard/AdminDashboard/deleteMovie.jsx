import { useNavigate } from "react-router-dom";
import useGetAllMovies from "../../../hooks/useGetAllMovies";
import Loader from "../../../components/Loader/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const DeleteMovie = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure()
    const [allMovies, allMoviesPending, refetch] = useGetAllMovies();
    if (allMoviesPending) {
        return <Loader />
    }
    const handleDeleteMovie = async (movie_id) => {
        try {
            const response = await axiosSecure.delete(`/api/movies/DeleteMovie/${movie_id}`);
            if (response.status === 200) {
                toast.success("Movie deleted successfully");
                refetch()

            }
        } catch (error) {
            console.error("Error deleting movie:", error);
            toast.error("Failed to delete the movie. Please try again.");
        }
    };

    return (
        <div>
            <h3 className="text-center text-4xl mt-10">Delete Movie</h3>
            <div className="my-5">

                <form className="max-w-md mx-auto">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none" placeholder="Enter keywords..." required />

                    </div>
                </form>

            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Type</th>
                            <th>Release Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            allMovies.map((movie, index) => {
                                const baseURL = "http://localhost:5000/";
                                const { imagePath } = movie
                                const imageUrl = `${baseURL}${imagePath.replace(/\\/g, "/")}`;
                                return <tr key={index}>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={imageUrl}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{movie?.title}</div>
                                                <div className="text-sm opacity-50">Rating: {movie?.rating}/10</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {movie?.type}
                                    </td>
                                    <td>{new Date(movie?.releaseDate).toDateString()}</td>
                                    <th>
                                        <button onClick={() => handleDeleteMovie(movie?._id)} className="btn btn-outline btn-error btn-xs">Delete</button>
                                        {/* <button className="btn btn-outline btn-error btn-xs">details</button> */}
                                    </th>
                                </tr>
                            })
                        }


                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default DeleteMovie;