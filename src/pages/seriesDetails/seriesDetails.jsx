import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import useAxiosPublic from "../../hooks/useAxiosPublic";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";
import axios from 'axios';

const SeriesDetails = () => {
    const { id } = useParams();
    const [series, setSeries] = useState(null);

    useEffect(() => {
        const fetchTVSeries = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/tv-series/tv-series-details/${id}`);
                setSeries(res.data);
            } catch (err) {
                console.error('Error fetching TV series:', err);
            }
        };

        fetchTVSeries();
    }, [id]);

    if (!series) return <p className="text-center mt-10">Loading...</p>;

    // const { videoPath, subtitlePath, imagePath, title, description } = episodeInfo;
    // const imageUrl = `${baseURL}${imagePath.replace(/\\/g, "/")}`;
    // const videoUrl = `${baseURL}${videoPath.replace(/\\/g, "/")}`;
    // const subtitleUrl = `${baseURL}${subtitlePath.replace(/\\/g, "/")}`;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 mt-20">
            {/* Title & Poster */}
            <div className="flex flex-col md:flex-row items-start gap-6">
                <img
                    src={`http://localhost:5000/${series.posterUrl.replace(/\\/g, '/')}`}
                    alt={series.title}
                    className="w-full md:w-64 rounded-lg shadow-md"
                />
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{series.title}</h1>
                    <p className="text-sm text-gray-500 mb-4">{new Date(series.releaseDate).toDateString()}</p>
                    <p className="text-lg mb-4">{series.description}</p>
                    <p><strong>Genres:</strong> {series.genre.join(', ')}</p>
                    <p><strong>Cast:</strong> {series.cast.join(', ')}</p>
                    <p><strong>Director:</strong> {series.director}</p>
                    <p><strong>Rating:</strong> {series.rating}/10</p>
                </div>
            </div>

            {/* Trailer */}
            {series.youtubeLink && (
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe
                            src={series.youtubeLink}
                            title="YouTube trailer"
                            allowFullScreen
                            className="w-full h-96 rounded-md shadow-md"
                        ></iframe>
                    </div>
                </div>
            )}

            {/* Seasons and Episodes */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Seasons</h2>
                {series.seasons.map((season) => (
                    <div key={season._id} className="mb-6">
                        <h3 className="text-xl font-bold mb-2">Season {season.seasonNumber}</h3>
                        <div className="grid gap-4">
                            {season.episodes.map((episode) => (
                                <div
                                    key={episode._id}
                                    className="p-4 bg-gray-100 rounded-md shadow-sm"
                                >
                                    <h4 className="text-lg font-semibold">{episode.title}</h4>
                                    <p className="text-sm text-gray-600 mb-2">{episode.description}</p>
                                    <p className="text-sm"><strong>Duration:</strong> {episode.duration} mins</p>
                                    {episode.videoFile && (
                                        <video
                                            controls
                                            className="w-full mt-2 rounded"
                                            src={`http://localhost:5000/${episode.videoFile.replace(/\\/g, '/')}`}
                                        >
                                            {episode.subtitleFile && (
                                                <track
                                                    label="English"
                                                    kind="subtitles"
                                                    srcLang="en"
                                                    src={`http://localhost:5000/${episode.subtitleFile.replace(/\\/g, '/')}`}
                                                    default
                                                />
                                            )}
                                        </video>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeriesDetails;
