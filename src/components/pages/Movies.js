import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import './Data.css';
import SearchBox from '../SearchBox';
import MovieDetail from './MovieDetail';
import ActionImage from '../../img/Action.png'
import AnimationImage from '../../img/Animation.png';
import ChildrenImage from '../../img/Children.png';
import SciFiImage from '../../img/Science fiction.png';
import ThrillerImage from '../../img/Thriller.png';
import DramaImage from '../../img/Drama.png';
import HorrorImage from '../../img/Horror.png';
import RomanceImage from '../../img/Romance.png';
import NotFoundImage from '../../img/notfound.png';


function Movies({ data }) {

    const [visibleMovies, setVisibleMovies] = useState(4);
    const [movies, setMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (data && data.length > 0) {
            setMovies(data);
        } else {
            fetchData();
        }
    }, []);

    /* Handles the API call to fetch all movies, 
    while additionally checking if the selected genre is "All", 
    and if not, then fetch the requested genre */

    const fetchData = async () => {
        let API_URL_MOVIES = "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da&byProgramType=movie";
        if (selectedGenre !== 'All') {
            API_URL_MOVIES += `&byTags=genre:${selectedGenre}`;
        }

        try {
            const response = await fetch(API_URL_MOVIES);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            const filteredData = data.entries.map(movie => ({
                id: movie.id,
                title: movie.title,
            }))
            setMovies(filteredData || []);
        } catch (error) {
            console.error('Error fetching movies data: ', error);
        }
    };

    const loadMore = () => {
        setVisibleMovies(prevVisibleMovies => prevVisibleMovies + 4);
    }

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
    }

    const getGenreImage = (genre) => {
        switch (genre) {
            case 'Action':
                return ActionImage;
            case 'Animation':
                return AnimationImage;
            case 'Science Fiction':
                return SciFiImage;
            case 'Gyser':
                return HorrorImage;
            case 'Drama':
                return DramaImage;
            case 'Romantik':
                return RomanceImage;
            case 'Thriller':
                return ThrillerImage;
            case 'Børnefilm':
                return ChildrenImage;
            default:
                return NotFoundImage;
        }
    }
    
    /* Extracts the numeric part of the id */
    const extractMovieId = (id) => {
        const parts = id.split('/');
        return parts[parts.length - 1];
    }

    const filteredMovies = selectedGenre === 'All'
        ? movies.filter(movie => movie.title.toLowerCase().includes(searchValue.toLowerCase()))
        : movies.filter(movie => movie.plprogram$tags.some(tag => tag.plprogram$title === selectedGenre))
            .filter(movie => movie.title.toLowerCase().includes(searchValue.toLowerCase()));


    return (
        <div className='item-container'>
            <div className='genre-search-container'>
                <div className='genre-filter'>
                    <label htmlFor='genre'>Filter by Genre:</label>
                    <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
                        <option value='All'>All</option>
                        <option value='Action'>Action</option>
                        <option value='Animation'>Animation</option>
                        <option value='Science Fiction'>Science Fiction</option>
                        <option value='Gyser'>Horror</option>
                        <option value='Drama'>Drama</option>
                        <option value='Romantik'>Romance</option>
                        <option value='Thriller'>Thriller</option>
                        <option value='Børnefilm'>Children</option>
                    </select>
                </div>
                <div className='search-box'>
                    <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
                </div>
            </div>
            <div className='item-card'>
                {filteredMovies.slice(0, visibleMovies).map((movie, index) => (
                    <div key={index} className='item'>
                        <Link to={`/Movie/${extractMovieId(movie.id)}`}>
                        <img className='item-image' src={getGenreImage(selectedGenre)} alt={selectedGenre} />
                        </Link>
                        <h6 className='item-title'>{movie.title}</h6>
                    </div>
                ))}
            </div>
            <div className='amount-button'>
                <p className='item-amount'>Number of series available: {filteredMovies.length}</p>
                {visibleMovies < movies.length && (
                    <button className='load-btn' onClick={loadMore}>Load More</button>
                )}
            </div>
        </div>
    )

}

export default Movies;
