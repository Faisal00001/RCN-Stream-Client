import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Navbar from "../shared/navbar";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const MainLayout = () => {
    return (
        <div>
            <ScrollToTop />
            <div className="text-white">

                <Navbar />
            </div>
            <Outlet></Outlet>
            <Toaster />
        </div>
    );
};

export default MainLayout;