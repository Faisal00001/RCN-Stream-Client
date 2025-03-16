import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Navbar from "../shared/navbar";

const MainLayout = () => {
    return (
        <div>
            <div className="text-white">
            <Navbar/>
            </div>
            <Outlet></Outlet>
            <Toaster />
        </div>
    );
};

export default MainLayout;