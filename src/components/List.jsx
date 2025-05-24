// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Scrollbar, Navigation } from 'swiper/modules';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCategoryWiseMedia from '../hooks/useCategoryWiseMedia';
import PropTypes from 'prop-types';
import Loader from './Loader/Loader';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import VideoCard from './VideoCard/VideoCard';
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosArrowDroprightCircle } from 'react-icons/io';


const List = ({ title }) => {
    const baseURL = "http://localhost:5000/";
    const [categoryWiseMedia, totalPages, categoryWiseMediaLoading] = useCategoryWiseMedia(title)

    const [videoUrl, setVideoUrl] = useState(null);
    const navigate = useNavigate()
    // Function to open the video modal
    if (categoryWiseMediaLoading) {
        return <Loader />
    }

    const handlePlayClick = (url) => {
        setVideoUrl(url);
    };

    // Function to close the modal
    const closeModal = () => {
        setVideoUrl(null);
    };
    const handleViewMoreContent = (title) => {
        console.log(title)
        if (title === 'Trending Movies') {
            navigate('/trendingMoviesPage')
        }
        else if (title === 'Trending Tv Shows') {
            navigate('/trendingTvShowsPage')
        }
        else if (title === 'Latest Movies') {
            navigate('/latestMoviesPage')
        }
        else if (title === 'Latest Tv Seires') {
            navigate('/latestTvSeiresPage')
        }
    }
    return (
        <div className='py-10 mt-10'>
            <div className='mb-5 flex justify-between items-center'>
                <button className='bg-green-600 px-3 py-0.5 rounded flex gap-1 items-center '><span className='text-lg pl-2.5'>{title}</span> <MdKeyboardArrowRight className='text-white text-4xl mt-1 ' /> </button>
                <div onClick={() => handleViewMoreContent(title)} className='flex gap-2 items-center mr-5 cursor-pointer'>
                    <p className="text-green-600">View more {title} </p>
                    <IoIosArrowDroprightCircle className="text-green-600" />
                </div>
            </div>



            <div className='grid grid-cols-4 gap-10'>
                {
                    categoryWiseMedia ? (
                        categoryWiseMedia.map((content, index) => {
                            return (

                                <div key={index} >
                                    <VideoCard content={content} handlePlayClick={handlePlayClick} />
                                </div>


                            );
                        })
                    ) : (
                        <p className='text-red-500 text-2xl'>No content available for this category.</p> // Display this message if no movies are found
                    )
                }
            </div>


            {
                videoUrl && (

                    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                        <div className="relative w-[800px] h-[450px] bg-black">
                            <button onClick={closeModal} className="absolute -top-10 -right-10 text-white text-4xl">&times;</button>
                            <iframe
                                className="w-full h-full"
                                src={videoUrl}
                                title="YouTube Video"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                )
            }
        </div>
    );
};
List.propTypes = {
    title: PropTypes.string.isRequired,
};
export default List;