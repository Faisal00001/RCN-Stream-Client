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
import useCategoryWiseMovies from '../hooks/useCategoryWiseMovies';
import PropTypes from 'prop-types';
import Loader from './Loader/Loader';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import VideoCard from './VideoCard/VideoCard';


const List = ({ title }) => {
    const baseURL = "http://localhost:5000/";
    const [categoryWiseMovies, categoryWiseMoviesLoading] = useCategoryWiseMovies(title)

    const [videoUrl, setVideoUrl] = useState(null);
    const navigate = useNavigate()
    // Function to open the video modal
    if (categoryWiseMoviesLoading) {
        return <Loader />
    }
    console.log(categoryWiseMovies)
    const handlePlayClick = (url) => {
        setVideoUrl(url);
    };

    // Function to close the modal
    const closeModal = () => {
        setVideoUrl(null);
    };

    return (
        <div className='py-10 w-[90%] mx-auto'>
            <h3 className='text-2xl font-bold py-5 pl-16'>{title}</h3>
            <Swiper
                slidesPerView={4}
                scrollbar={{
                    hide: true,
                }}

                navigation={true}

                modules={[Scrollbar, Navigation]}
                className="mySwiper"
            >


                {
                    categoryWiseMovies ? (
                        categoryWiseMovies.map((content, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <VideoCard content={content} handlePlayClick={handlePlayClick} />
                                </SwiperSlide>
                            );
                        })
                    ) : (
                        <p className='text-red-500 text-2xl'>No content available for this category.</p> // Display this message if no movies are found
                    )
                }
            </Swiper>

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