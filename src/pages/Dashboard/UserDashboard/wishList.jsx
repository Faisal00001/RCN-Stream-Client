




import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useMyList from "../../../hooks/useMyList";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loader from "../../../components/Loader/Loader";

const WishList = () => {
    const axiosPublic = useAxiosPublic();
    const baseURL = "http://localhost:5000/";
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const [wishList, wishListPending, refetch] = useMyList(userId);

    if (wishListPending) {
        return <Loader />;
    }

    const handleRemoveWishlistItem = async (movieId) => {
        if (!movieId) {
            toast.error("Invalid movie ID");
            return;
        }

        try {
            const response = await axiosPublic.delete(`/api/wishlist/remove/${movieId}`, {
                params: { userId },
            });

            if (response.status === 200) {
                toast.success("Movie removed successfully");
                refetch();
            } else {
                throw new Error("Failed to remove movie");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const handleDetails = (content) => {
        if (content?.movieId?.type === "Movie") {
            navigate(`/movieDetails/${content?.movieId?._id}`);
        } else if (content?.type === "TVSeries") {
            navigate(`/tvseriesDetails/${content?._id}`);
        }
    };

    return (
        <section className="h-screen  text-white flex flex-col items-center py-12 px-6">
            <h1 className="text-5xl font-extrabold mb-8 tracking-wide drop-shadow-lg">
                My Wish List
            </h1>

            {!wishList || wishList.length === 0 ? (
                <p className="text-xl text-indigo-300 mt-20">Your wishlist is empty ❌</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
                    {wishList.map((item, idx) => {
                        const { movieId } = item;
                        if (!movieId) return null;

                        const imageUrl = `${baseURL}${movieId.imagePath.replace(/\\/g, "/")}`;

                        return (
                            <div
                                key={idx}
                                className="bg-indigo-800 bg-opacity-80 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-col"
                            >
                                <img
                                    src={imageUrl}
                                    alt={`${movieId.title} poster`}
                                    className="h-72 w-full object-cover"
                                    draggable={false}
                                    onClick={() => handleDetails(item)}
                                />

                                <div className="p-6 flex flex-col flex-grow">
                                    <h2
                                        className="text-2xl font-semibold mb-2"
                                        onClick={() => handleDetails(item)}
                                    >
                                        {movieId.title}
                                    </h2>
                                    <p className="text-indigo-300 mb-6 line-clamp-4">
                                        {movieId.description}
                                    </p>
                                    <div className="mt-auto flex justify-between items-center">
                                        <button
                                            onClick={() => handleDetails(item)}
                                            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-white font-semibold transition"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => handleRemoveWishlistItem(item._id)}
                                            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-semibold transition"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default WishList;
