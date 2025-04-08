import { Link, Outlet } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import useAdmin from "../hooks/useAdmin";
import { ImProfile } from "react-icons/im";
import { IoMdAddCircle } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { Toaster } from "react-hot-toast";
const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin()
    if (isAdminLoading) {
        return <Loader />
    }
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* Main content area */}
            <div className="drawer-content flex flex-col ">
                {/* Toggle button for small screens */}
                <label htmlFor="my-drawer-2" className="btn bg-blue-500 text-white hover:bg-blue-600 drawer-button lg:hidden">
                    Open drawer
                </label>

                {/* Routed content area */}
                <div className="bg-gray-800 text-white h-full p-6">
                    <Outlet />
                    <Toaster />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-gray-900 text-gray-200 h-screen w-80 p-4">
                    {isAdmin ? (
                        <>
                            <Link
                                to="/"
                                className="flex items-center gap-2 text-lg hover:bg-gray-700 p-2 rounded-md"
                            >
                                <IoMdHome className="text-xl text-blue-400" />
                                Home
                            </Link>
                            <li>
                                <a className="flex items-center gap-2 text-lg hover:bg-gray-700 p-2 rounded-md">
                                    <ImProfile className="text-xl text-blue-400" />
                                    Profile
                                </a>
                            </li>
                            <Link
                                to="/dashboard/addCategory"
                                className="flex items-center gap-2 text-lg hover:bg-gray-700 p-2 rounded-md"
                            >
                                <IoMdAddCircle className="text-xl text-blue-400" />
                                Add Media Category
                            </Link>
                            <Link
                                to="/dashboard/addMovies"
                                className="flex items-center gap-2 text-lg hover:bg-gray-700 p-2 rounded-md"
                            >
                                <IoMdAddCircle className="text-xl text-blue-400" />
                                Add Media
                            </Link>

                        </>
                    ) :
                        (
                            <>
                                <Link
                                    to="/"
                                    className="flex items-center gap-2 text-lg hover:bg-gray-700 p-2 rounded-md"
                                >
                                    <IoMdHome className="text-xl text-blue-400" />
                                    Home
                                </Link>
                                <li>
                                    <a className="flex items-center gap-2 text-lg hover:bg-gray-700 p-2 rounded-md">
                                        <ImProfile className="text-xl text-blue-400" />
                                        Profile
                                    </a>
                                </li>
                            </>
                        )}
                </ul>
            </div>
        </div>

    );
};

export default Dashboard;