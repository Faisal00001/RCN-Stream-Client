import axios from 'axios';
import { useState } from 'react';


const AddTvShows = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        genre: '',
        cast: '',
        director: '',
        rating: '',
        description: '',
        youtubeLink: '',
        'tv-series-poster': '',
        releaseDate: '',
        seasons: [],
    });

    const [poster, setPoster] = useState(null);


    const handleInputChange = (e, field) => {
        if (field === 'tv-series-poster') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.files[0],
            });
        }
        else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }

    };

    const addSeason = () => {
        const newSeason = {
            seasonNumber: formData.seasons.length + 1,
            episodes: [],
        };
        setFormData({
            ...formData,
            seasons: [...formData.seasons, newSeason],
        });
    };

    const addEpisode = (seasonIndex) => {
        const newEpisode = {
            title: '',
            videoFile: '',
            subtitleFile: '',
            duration: '',
            description: '',
            releaseDate: '',
        };
        const updatedSeasons = [...formData.seasons];
        updatedSeasons[seasonIndex].episodes.push(newEpisode);
        setFormData({ ...formData, seasons: updatedSeasons });
    };

    const handleEpisodeChange = (seasonIndex, episodeIndex, field, value) => {

        const updatedSeasons = [...formData.seasons];

        if (field === 'videoFile' || field === 'subtitleFile') {
            updatedSeasons[seasonIndex].episodes[episodeIndex][field] = value.target.files[0]; // Store File
        } else {
            updatedSeasons[seasonIndex].episodes[episodeIndex][field] = value;
        }

        setFormData({ ...formData, seasons: updatedSeasons });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('title', formData.title);
        form.append('description', formData.description);
        form.append('director', formData.director);
        form.append('youtubeLink', formData.youtubeLink);
        form.append('releaseDate', formData.releaseDate);
        form.append('rating', parseFloat(formData.rating));
        form.append('tv-series-poster', formData['tv-series-poster'])
        // Handle arrays (cast and genre)
        formData.cast.split(',').forEach((castMember) => {
            form.append('cast[]', castMember.trim());
        });

        formData.genre.split(',').forEach((genreItem) => {
            form.append('genre[]', genreItem.trim());
        });

        formData.seasons.forEach((season, seasonIndex) => {
            form.append(`seasons[${seasonIndex}][seasonNumber]`, season.seasonNumber);
            season.episodes.forEach((ep, epIndex) => {
                form.append(`seasons[${seasonIndex}][episodes][${epIndex}][title]`, ep.title);
                form.append(`seasons[${seasonIndex}][episodes][${epIndex}][description]`, ep.description);
                form.append(`seasons[${seasonIndex}][episodes][${epIndex}][duration]`, ep.duration);
                form.append(`seasons[${seasonIndex}][episodes][${epIndex}][releaseDate]`, ep.releaseDate);
                form.append(`seasons[${seasonIndex}][episodes][${epIndex}][videoFile]`, ep.videoFile);
                form.append(`seasons[${seasonIndex}][episodes][${epIndex}][subtitleFile]`, ep.subtitleFile);
            });
        });
        console.log('dadw')
        for (let [key, value] of form.entries()) {
            console.log(`${key}:`, value);
        }
        try {
            const response = await axios.post(
                'http://localhost:5000/api/tv-series/upload-tv-series',
                form,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            alert('TV Series posted successfully!');
            console.log(response.data);
        } catch (err) {
            console.error(err);
            alert('Error posting TV series');
        }
    };


    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6 mt-20">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Add TV Series</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="title" placeholder="Title" value={formData.title} onChange={handleInputChange}
                    className="input input-bordered w-full" />



                <input name="genre" placeholder="Genre (comma separated)" value={formData.genre} onChange={handleInputChange}
                    className="input input-bordered w-full" />

                <input name="cast" placeholder="Cast (comma separated)" value={formData.cast} onChange={handleInputChange}
                    className="input input-bordered w-full" />

                <input name="director" placeholder="Director" value={formData.director} onChange={handleInputChange}
                    className="input input-bordered w-full" />

                <input name="rating" type="number" placeholder="Rating" value={formData.rating} onChange={handleInputChange}
                    className="input input-bordered w-full" />

                <label className="input input-bordered pt-3">
                    Upload Tv series Poster
                </label>
                <input
                    type="file"
                    name="tv-series-poster"
                    accept="image/*"
                    onChange={(e) => handleInputChange(e, 'tv-series-poster')}
                    className="w-full bg-gray-700 file-input"
                    required
                />

                <input name="youtubeLink" placeholder="YouTube Link" value={formData.youtubeLink} onChange={handleInputChange}
                    className="input input-bordered w-full" />

                <input name="releaseDate" type="date" value={formData.releaseDate} onChange={handleInputChange}
                    className="input input-bordered w-full" />
            </div>

            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange}
                className="textarea textarea-bordered w-full" rows={4}></textarea>

            <div className="flex justify-end">
                <button type="button" onClick={addSeason} className="btn btn-outline btn-primary">
                    + Add Season
                </button>
            </div>

            {formData.seasons.map((season, seasonIndex) => (
                <div key={seasonIndex} className="border rounded-md p-4 bg-gray-500">
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium">Season {season.seasonNumber}</h4>
                        <button type="button" onClick={() => addEpisode(seasonIndex)} className="btn btn-sm btn-outline">
                            + Add Episode
                        </button>
                    </div>

                    {season.episodes.map((episode, episodeIndex) => (
                        <div key={episodeIndex} className="mt-4 border-t pt-4 grid grid-cols-1  gap-4">
                            <input
                                placeholder="Episode Title"
                                value={episode.title}
                                onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, 'title', e.target.value)}
                                className="input input-bordered w-full"
                            />
                            <label className="block mb-2 text-sm font-medium text-white">
                                Upload Video
                            </label>
                            <input
                                type="file"
                                id="videoInput"
                                name="video"
                                accept="video/*"
                                onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, 'videoFile', e)}
                                className="w-full bg-gray-700 file-input"
                                required
                            />

                            {/* <input
                                placeholder="Video URL"
                                value={episode.videoUrl}
                                onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, 'videoUrl', e.target.value)}
                                className="input input-bordered w-full"
                            /> */}
                            <label className="block mb-2 text-sm font-medium text-white">
                                Upload Subtitle
                            </label>
                            <input

                                type="file"
                                id="subtitleInput"
                                name="subtitle"
                                accept=".srt,.vtt"
                                onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, 'subtitleFile', e)}
                                className="w-full bg-gray-700 file-input"
                            />
                            <input
                                placeholder="Duration (minutes)"
                                type="number"
                                value={episode.duration}
                                onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, 'duration', e.target.value)}
                                className="input input-bordered w-full"
                            />
                            <input
                                placeholder="Episode Release Date"
                                type="date"
                                value={episode.releaseDate}
                                onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, 'releaseDate', e.target.value)}
                                className="input input-bordered w-full"
                            />
                            <textarea name="description" placeholder="Episode description" value={episode.description} onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, 'description', e.target.value)}
                                className="textarea textarea-bordered w-full" rows={4}></textarea>
                        </div>
                    ))}
                </div>
            ))}

            <div className="flex justify-center pt-6">
                <button type="submit" className="btn btn-primary px-6">
                    Submit TV Series
                </button>
            </div>
        </form>

    );
};

export default AddTvShows;
