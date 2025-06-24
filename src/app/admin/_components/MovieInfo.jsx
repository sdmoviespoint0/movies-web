// components/MovieInfo.js
"use client"
import { useState } from 'react';

const MovieInfo = () => {
    const [title, setTitle] = useState('');
    const [movieData, setMovieData] = useState(null);
    const [error, setError] = useState('');

    const apiKey = 'c694f8e9';

    const fetchMovieData = async () => {
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            
            if (data.Response === "True") {
                setMovieData(data);
                setError('');
            } else {
                setError(data.Error);
                setMovieData(null);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while fetching the movie data.');
            setMovieData(null);
        }
    };

    const handleSearch = () => {
        fetchMovieData();
    };

    return (
        <div className='text-black'>
            <h1>Movie Information</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter movie title"
            />
            <button onClick={handleSearch}>Search</button>
            <div id="movieInfo">
                {movieData && (
                    <div>
                        <h2>{movieData.Title} ({movieData.Year})</h2>
                        <p><strong>Director:</strong> {movieData.Director}</p>
                        <p><strong>Writer:</strong> {movieData.Writer}</p>
                        <p><strong>Stars:</strong> {movieData.Actors}</p>
                        <p><strong>Plot:</strong> {movieData.Plot}</p>
                    </div>
                )}
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default MovieInfo;
