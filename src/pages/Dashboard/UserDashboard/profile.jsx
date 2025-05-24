import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-20 border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">User Profile</h2>
            <div className="flex flex-col items-center">
                {/* Profile Photo */}
                <img
                    src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-2 border-blue-400 object-cover mb-4"
                />
                {/* User Info */}
                <div className="text-center">
                    <p className="text-lg font-semibold text-gray-700">
                        {user?.displayName || "No Name Provided"}
                    </p>
                    <p className="text-gray-500">{user?.email}</p>
                    {/* <p className="text-sm text-gray-400 mt-1">
                        Email Verified:{" "}
                        <span className={user?.emailVerified ? "text-green-600" : "text-red-600"}>
                            {user?.emailVerified ? "Yes" : "No"}
                        </span>
                    </p> */}
                </div>
            </div>
        </div>
    );
};

export default Profile;
