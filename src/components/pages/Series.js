import React, {useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import SearchBox from '../SearchBox';
import './Data.css';
import ChildrenShowImage from '../../img/childrenShow.png';
import HorrorShowImage from '../../img/horrowShow.png';
import DanishSHowImage from '../../img/danishShow.png';
import ChristmasShowImage from '../../img/christmasShow.png';
import DramaShowImage from '../../img/dramaShow.png';
import CrimeShowImage from '../../img/crimeShow.png';
import NotFoundImage from '../../img/notfound.png';


function Series ({data}) {

    const [visibleSeries, setVisibleSeries] = useState(4);
    const [series, setSeries] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');

    useEffect(() => {
        if(data && data.length > 0) {
            setSeries(data);
        } else {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        const API_URL_SERIES = "https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da&byProgramType=series";
        
        try {
            const response = await fetch(API_URL_SERIES);
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setSeries(data.entries || []);
        } catch (error) {
            console.error('Error fetching series data: ', error);
        }    
    };

    const loadMore = () => {
        setVisibleSeries(prevVisibleSeries => prevVisibleSeries + 4);
    }

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
    }

    const getGenreImage = (genre) => {
        switch (genre) {
            case 'Horror shows':
                return HorrorShowImage;
            case 'Julekalendere':
                return ChristmasShowImage;
            case 'Danish shows':
                return DanishSHowImage;
            case 'Kids shows':
                return ChildrenShowImage;
            case 'Crime shows':
                return CrimeShowImage;
            case 'Drama shows':
                return DramaShowImage;
            default:
                return NotFoundImage;
        }
    }

    const filteredSeries = selectedGenre === 'All' 
    ? series.filter(serie =>
        serie.title.toLowerCase().includes(searchValue.toLowerCase()))
    : series.filter(serie =>
        serie.plprogram$tags.some(tag =>
            tag.plprogram$title.toLowerCase().includes(selectedGenre.toLowerCase())
        ) && serie.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    function extractSerieId(serieUrl) {
        const parts = serieUrl.split('/');
        return parts[parts.length - 1]; // Assuming serieId is the last part of the URL
    }

    return (
        <div className='item-container'>
            <div className='genre-search-container'>
                <div className='genre-filter'>
                    <label htmlFor='genre'>Filter by Genre:</label>
                    <select id='genre' value={selectedGenre} onChange={handleGenreChange}>
                        <option value='All'>All</option>
                        <option value='Horror shows'>Horror</option>
                        <option value='Julekalendere'>Christmas</option>
                        <option value='Kids shows'>Kids</option>
                        <option value='Danish shows'>Danish</option>
                        <option value='Crime shows'>Crime</option>
                        <option value='Drama shows'>Drama</option>
                    </select>
                </div>
            <div className='search-box'>
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>
            </div>
            <div className='item-card'>
            {filteredSeries.slice(0, visibleSeries).map((serie, index) => (
                <div key={index} className='item'>
                    <Link to={`/Serie/${extractSerieId(serie.id)}`}>
                        <img className='item-image' src={getGenreImage(selectedGenre)} alt="Show"/>
                    </Link>
                    <h6 className='item-title'>{serie.title}</h6>
                </div>
            ))}
            </div>
            <div className='amount-button'>
            <p className='item-amount'>Number of series available: {filteredSeries.length}</p>
            {visibleSeries < series.length && (
                <button className="load-btn" onClick={loadMore}>Load more</button>
            )}
            </div>
        </div>
    )
}

export default Series;