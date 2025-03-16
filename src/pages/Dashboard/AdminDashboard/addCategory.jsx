import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddCategory = () => {
    const axiosSecure = useAxiosSecure()
    const [category, setCategory] = useState("");

    const handleChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!category.trim()) {
            toast.error("Category cannot be empty!");
            return;
        }

        console.log("Adding Category:", category); // Debugging

        try {
            const response = await axiosSecure.post('/api/category/add-category', { category });

            if (response.status === 201 || response.status === 200) {
                toast.success("Category added successfully!");
                setCategory(""); // Clear input field
            } else {
                toast.error("Failed to add category. Please try again.");
            }
        } catch (error) {
            toast.error(error.response.data.message || "Server error. Try again later.");
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white max-w-lg mx-auto rounded-lg mt-28">
            <h2 className="text-2xl font-bold mb-4">Add Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="category"
                    placeholder="Enter Category"
                    value={category}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Category
                </button>
            </form>
        </div>
    );
};

export default AddCategory;
