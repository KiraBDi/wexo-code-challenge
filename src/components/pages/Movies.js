import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WatchListContext } from '../context/WatchListContext';
import './Data.css';
import SearchBox from '../SearchBox';
import ActionImage from '../../img/Action.png'
import AnimationImage from '../../img/Animation.png';
import ChildrenImage from '../../img/Children.png';
import ThrillerImage from '../../img/Thriller.png';
import DramaImage from '../../img/Drama.png';
import HorrorImage from '../../img/Horror.png';
import ComedyImage from '../../img/comedyMovie.png';
import NotFoundImage from '../../img/notfound.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';


function Movies({ data }) {
    const { addToWatchList, removeFromWatchList, watchList } = useContext(WatchListContext);
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
        let API_URL_MOVIES = "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=en&byProgramType=movie";
        if (selectedGenre !== 'All') {
            API_URL_MOVIES += `&byTags=genre:${selectedGenre}`;
        }

        try {
            const response = await fetch(API_URL_MOVIES);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log('Fetched data: ', data);
            const filteredData = data.entries.map(movie => ({
                id: movie.id,
                title: movie.title,
                genre: extractGenre(movie.plprogram$tags),
            }))
            console.log('Filtered data: ', filteredData);
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
        setSearchValue('');
    }

    const getGenreImage = (genre) => {
        switch (genre) {
            case 'Action':
                return ActionImage;
            case 'Animation':
                return AnimationImage;
            case 'Horror':
                return HorrorImage;
            case 'Drama':
                return DramaImage;
            case 'Comedy':
                return ComedyImage;
            case 'Thriller':
                return ThrillerImage;
            case 'Kids movies':
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

    const extractGenre = (tags) => {
        if (!tags || tags.length === 0) {
            return undefined;
        }
        const genreTag = tags.find(tag => tag.plprogram$scheme === "genre");
        return genreTag ? genreTag.plprogram$title : undefined;
    };
    

    const filteredMovies = selectedGenre === 'All'
    ? movies.filter(movie => movie.title.toLowerCase().includes(searchValue.toLowerCase()))
    : movies.filter(movie =>
        movie.genre?.toLowerCase() === selectedGenre.toLowerCase()
    );


    /* This sections is responsible for rendering af list of movies 
    with the possibilty of filtering based on genre.
    You can also search for a specific movie and save the movie to a watchlist */
    return (
        <div className='item-container'>
            <div className='genre-search-container'>
                <div className='genre-filter'>
                    <label htmlFor='genre'>Filter by Genre:</label>
                    <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
                        <option value='All'>All</option>
                        <option value='Action'>Action</option>
                        <option value='Animation'>Animation</option>
                        <option value='Horror'>Horror</option>
                        <option value='Drama'>Drama</option>
                        <option value='Comedy'>Comedy</option>
                        <option value='Thriller'>Thriller</option>
                        <option value='Kids movies'>Children</option>
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
                        {/* If the heart is solid, the movie is in the watchlist and can be removed */}
                        {watchList.some(item => item.id === movie.id) ? (
                            <FontAwesomeIcon
                                icon={solidHeart}
                                className='heart-icon'
                                onClick={() => removeFromWatchList(movie.id)}
                            />
                        ) : (
                            //If the heart is not solid, the movie can be added to the watchlist
                            <FontAwesomeIcon
                                icon={regularHeart}
                                className='heart-icon'
                                onClick={() => addToWatchList(movie)}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className='amount-button'>
                <p className='item-amount'>Number of movies available: {filteredMovies.length}</p>
                {visibleMovies < movies.length && (
                    <button className='load-btn' onClick={loadMore}>Load More</button>
                )}
            </div>
        </div>
    )

}

export default Movies;
