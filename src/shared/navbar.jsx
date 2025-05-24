import './navbar.css'
// import { IoMdSearch } from "react-icons/io";
// import { IoMdNotifications } from "react-icons/io";
// import { CgProfile } from "react-icons/cg";
// import { FaAngleDown } from "react-icons/fa";
import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { AuthContext } from '../context/AuthContext';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { GoDotFill } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
const Navbar = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const genresData = {
        genres: [
            "Action",
            "Action & Adventure",
            "Adventure",
            "Animation",
            "Biography",
            "Comedy",
            "Crime",
            "Documentary",
            "Drama",
            "Family",
            "Fantasy",
            "History",
            "Horror",
            "Kids",
            "Music",
            "Mystery",
            "News",
            "Reality",
            "Romance",
            "Sci-Fi & Fantasy",
            "Science Fiction",
            "Soap",
            "Talk",
            "Thriller",
            "TV Movie",
            "War",
            "War & Politics",
            "Western"
        ]
    };
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const handleSearch = useCallback(async () => {

        if (!query.trim()) return;
        setLoading(true)
        try {
            const response = await axiosPublic.get(`/api/movies-and-tv-series/search?query=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    }, [axiosPublic, query]);
    useEffect(() => {

        const delayDebounce = setTimeout(() => {
            if (query.trim()) {
                handleSearch();
            } else {
                setResults([]); // clear results when query is empty
            }
        }, 500); // wait 500ms after user stops typing

        return () => clearTimeout(delayDebounce);
    }, [query, handleSearch]);

    const handleLogOut = () => {
        logOut()
    }
    const handleAllResultsSearch = (e) => {
        e.preventDefault();
        const searchTerm = query.trim();
        setQuery('')
        navigate(

            searchTerm ? `/searchMedia?query=${encodeURIComponent(searchTerm)}` : '/searchMedia'

        );

    }
    const handleAllGenreSearch = (searchTerm, e) => {
        e.preventDefault();
        navigate(

            searchTerm ? `/searchMedia?query=${encodeURIComponent(searchTerm)}` : '/searchMedia'

        );
    }

    return (
        <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black" : "bg-gradient-to-t from-black/5 to-transparent"}`}>
            <div className="navbar px-4 lg:px-10">
                {/* Start */}
                <div className="navbar-start">
                    {/* Mobile dropdown */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52 text-white">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/tvShows">Series</Link></li>
                            <li><Link to="/history">History</Link></li>
                            <li><Link to="/liked">Liked</Link></li>
                            <li><Link to="/myList">My List</Link></li>
                            <li><Link to="/chatBot">ChatBot</Link></li>
                        </ul>
                    </div>

                    <Link to="/" className="text-2xl font-medium text-white">RCN Stream</Link>
                </div>

                {/* Center: Desktop menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 flex gap-6 text-base items-center">
                        <li>
                            <Link className="text-white hover:text-green-500 transition duration-300" to="/">Home</Link>
                        </li>

                        {/* Genre dropdown */}
                        <li className="relative group">
                            <span className="cursor-pointer text-white hover:text-green-500 transition duration-300">Genre</span>
                            <ul className="absolute hidden group-hover:grid top-full left-0 mt-0 pt-5 bg-black text-white z-50 w-[500px] p-4 grid-cols-1 sm:grid-cols-3 auto-rows-max gap-x-8 gap-y-2">
                                {genresData.genres.map((genre, index) => (
                                    <li key={index} className="whitespace-nowrap">
                                        <Link
                                            onClick={(e) => handleAllGenreSearch(genre, e)}
                                            className="text-white text-sm hover:text-green-500 transition duration-300">
                                            {genre}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li><Link className="text-white hover:text-green-500 transition duration-300" to="/movies">Movies</Link></li>
                        <li><Link className="text-white hover:text-green-500 transition duration-300" to="/tvShows">Series</Link></li>
                        <li><Link className="text-white hover:text-green-500 transition duration-300" to="/myList">My List</Link></li>
                        <li><Link className="text-white hover:text-green-500 transition duration-300" to="/chatBot">ChatBot</Link></li>
                    </ul>
                </div>

                {/* End */}
                <div className="navbar-end flex items-center gap-2">
                    {/* Search */}
                    <div className="relative hidden md:block w-[200px] xl:w-[250px] 2xl:w-[300px]">
                        <div onClick={handleSearch} className="absolute right-3 top-2.5 cursor-pointer">
                            <IoSearch className="text-xl text-black" />
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full px-4 py-2.5 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:outline-none placeholder-black"
                            placeholder="Enter Keywords..."
                        />
                        {/* Search Result Dropdown */}
                        {!loading && results.length > 0 && (
                            <div className="mt-2 absolute z-40 w-full">
                                <div className="bg-[#1c1c1d] rounded p-3 shadow">
                                    {results.map((media) => {
                                        const baseURL = 'http://localhost:5000/';
                                        const imageUrl = media?.type === 'Movie'
                                            ? `${baseURL}${media.imagePath.replace(/\\/g, "/")}`
                                            : `${baseURL}${media.posterUrl.replace(/\\/g, "/")}`;
                                        return (
                                            <div
                                                key={media._id}
                                                onClick={() => {
                                                    const path = media?.type === 'Movie' ? `/movieDetails/${media._id}` : `/tvseriesDetails/${media._id}`;
                                                    navigate(path);
                                                }}
                                                className="border-b border-gray-500 p-2 bg-[#1c1c1d] shadow cursor-pointer">
                                                <div className="flex gap-3 items-center">
                                                    {imageUrl && (
                                                        <div className="avatar">
                                                            <div className="w-16 rounded">
                                                                <img src={imageUrl} alt="Media" />
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="space-y-2">
                                                        <h2 className="text-sm font-medium text-white">{media.title}</h2>
                                                        <div className="flex gap-3 items-center text-xs text-gray-300">
                                                            <p>{new Date(media?.releaseDate).getFullYear()}</p>
                                                            <GoDotFill className="text-[0.60rem]" />
                                                            <p>{media?.duration || 'N/A'}</p>
                                                            <GoDotFill className="text-[0.60rem]" />
                                                            <p>{media?.type === 'Movie' ? 'Movie' : 'TV'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <button onClick={handleAllResultsSearch} className="bg-green-500 w-full py-2 rounded-b">View all results</button>
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    {user?.email ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="text-white cursor-pointer">
                                <FaUserCircle className='text-[45px]' />
                            </div>
                            <ul tabIndex={0} className="dropdown-content p-4 menu bg-black text-white rounded z-[1] w-52 space-y-2 shadow">
                                <li onClick={handleLogOut} className="hover:bg-red-500 p-2 rounded-sm cursor-pointer">Logout</li>
                                <Link to="/dashboard" className="hover:bg-red-500 p-2 rounded-sm cursor-pointer">Dashboard</Link>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login" className="bg-black text-white px-4 py-2 rounded-sm hover:bg-green-500 transition duration-300">Login</Link>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Navbar;