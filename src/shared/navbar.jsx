import './navbar.css'
// import { IoMdSearch } from "react-icons/io";
// import { IoMdNotifications } from "react-icons/io";
// import { CgProfile } from "react-icons/cg";
// import { FaAngleDown } from "react-icons/fa";
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logOut } = useContext(AuthContext)
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const handleLogOut = () => {
        logOut()
    }
    return (
        <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black" : "bg-gradient-to-t from-black/5 to-transparent"}`}>
            <div className="navbar lg:px-10 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-black text-white rounded-box z-[1] mt-3 w-52 p-2 shadow ">
                            <li>Home</li>
                            <li>Series</li>
                            <li>History</li>
                            <li>Liked</li>
                            <li>My List</li>
                        </ul>
                    </div>
                    <Link to={'/'} className=" text-3xl">RCN Stream</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 flex gap-6 text-base items-center">
                        <li>
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li>
                            Genre
                        </li>
                        <Link to={'/movies'}>Movies</Link>
                        <Link to={'/tvShows'}>Series</Link>
                        <li>
                            <Link to={'/myList'}>My List</Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end">
                    {
                        user?.email ? <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="">{user?.email}</div>
                            <ul tabIndex={0} className="dropdown-content p-4 menu  bg-black text-white rounded z-[1] w-52 space-y-2 shadow">
                                <li onClick={handleLogOut} className='hover:bg-red-500 p-2 rounded-sm cursor-pointer'>Logout</li>
                                <Link to={'/dashboard'} className='hover:bg-red-500 p-2 rounded-sm cursor-pointer'>Dashboard</Link>
                            </ul>
                        </div> : <Link to={'/login'} className='bg-black px-5 py-2 rounded-sm'>Login</Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;