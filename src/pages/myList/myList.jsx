import { useContext } from "react";
import useMyList from "../../hooks/useMyList";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader/Loader";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyList = () => {
  const axiosPublic = useAxiosPublic();
  const baseURL = "http://localhost:5000/";
  const navigate = useNavigate()
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
        params: { userId }, // Pass userId as a query param
      });

      if (response.status === 200) {
        toast.success("Movie removed successfully");
        refetch(); // Ensure refetch is working as expected
      } else {
        throw new Error("Failed to remove movie");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  const handleDetails = (content) => {
    console.log(content)
    navigate(`/movieDetails/${content?.movieId?._id}`)
  }
  return (
    <div className="bg-[#0c0b0b] text-white min-h-screen flex flex-col items-center">
      <div className="mt-20 container mx-auto">
        {!wishList ? (
          <div className="text-center text-white text-5xl mt-10">
            No Wishlist Found ❌
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {wishList?.map((movie, index) => {
              const { movieId } = movie;
              if (!movieId) return null;

              const imageUrl = `${baseURL}${movieId.imagePath.replace(/\\/g, "/")}`;

              return (
                <div key={index} className="max-w-4xl rounded overflow-hidden shadow-lg m-4 flex justify-between">
                  <div className="md:flex-shrink-0">
                    <img className="md:w-56 h-[400px] object-cover" draggable={false} src={imageUrl} alt={`${movieId.title} movie poster`} />
                  </div>

                  <div className="flex flex-col flex-grow px-8 py-4 bg-gray-800">
                    <h3 className="font-bold text-4xl md:text-2xl lg:text-2xl text-gray-200">{movieId.title}</h3>
                    <div className="flex-grow">
                      <p className="text-xl md:text-base lg:text-base text-gray-100 leading-snug truncate-overflow">
                        {movieId.description}
                      </p>
                    </div>
                    <div className="button-container flex justify-between mb-2">
                      <button onClick={() => handleDetails(movie)} className="text-lg mr-4 lg:text-sm text-gray-200">View Details</button>
                      <button onClick={() => handleRemoveWishlistItem(movie._id)} className="text-lg lg:text-sm font-bold py-2 px-4 rounded bg-orange-200 text-orange-700">
                        Remove from list
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;
