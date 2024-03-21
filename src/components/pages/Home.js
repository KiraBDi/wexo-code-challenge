import React, {useState, useEffect}from 'react';
import './Home.css';
import HarryPotterImage from '../../img/harryPotter.png';
import StarWarsImage from '../../img/starWars.png';
import LotrImage from '../../img/lotr.png';

function Home(){
    const [franchises, setFranchises] = useState(['Harry Potter', 'Star Wars', 'The Lord of the Rings']);
    const [franchiseMovies, setFranchiseMovies] = useState({});

    /* Initializing and declaring specific images to a specific franchis */
    const franchiseImages = {
        'Harry Potter': HarryPotterImage,
        'Star Wars': StarWarsImage,
        'The Lord of the Rings': LotrImage,
    };

    /* Handles the API call fetching movies 
    from a specific franchise,
    which have been declared on line 8. 
    It also sorts the movies in ascending order 
    from the first released to the latest released */

    useEffect(() => {
        const fetchFranchiseMovies = async () => {
            const fetchedMovies = {};
            for (const franchise of franchises) {
                try {
                const response = await fetch(`https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da&byProgramType=movie&byTags=franchise:${franchise}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const sortedMovies = data.entries.sort((a,b) => a.plprogram$year - b.plprogram$year);
                fetchedMovies[franchise] = sortedMovies;
                } catch (error) {
                    console.error(`Error fetching ${franchise} movies data: `, error);
                }
            }
            setFranchiseMovies(fetchedMovies);
        };
        fetchFranchiseMovies();
    }, [franchises]);
    
    /* Displays and handles the mapping of the movies */
    return (
        <div className='container'>
            {Object.keys(franchiseMovies).map(franchise => (
                <div>
                    <h3 className='franchise-header'>{franchise} Movies</h3>
                <div className="franchise-item-container" key={franchise}>
                    <div className="franchise-item-card">
                        {franchiseMovies[franchise].map((movie, index) => (
                            <div key={index} className="franchise-item">
                                    <img className="franchise-item-image" src={franchiseImages[franchise]} alt={movie.title} />
                                    <h6 className='franchise-item-title'>{movie.title}</h6>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            ))}
        </div>
    );
}

export default Home;