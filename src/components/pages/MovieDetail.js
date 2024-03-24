import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import NotFoundImg from '../../img/notfound.png';

function MovieDetail() {
    const { movieId } = useParams(); // Get the movie URL from params
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                if (!movieId) {
                    /* If the movieId is undefined, then display the following */
                    setMovieDetails({
                        title: "Movie not available",
                        description: "Movie not available",
                        plprogram$credits: [],
                    });
                    return;
                }
                const response = await fetch(`https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/${movieId}?form=json&fields=title,description,plprogram$credits`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                const data = await response.json();
                setMovieDetails(data);
            } catch (error) {
                console.error('Error fetching movie details: ', error);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    const { title, description, plprogram$credits } = movieDetails;

    return (
        <div className='details-container'>
            <h1>Title: {title}</h1>
            <div className='img-description-container'>
                <img src={NotFoundImg} className='img'/>
                <div>
                    <h4>Description:</h4>
                    <p className='description'>{description}</p>
                </div>
            </div> 
            <h2>Credits</h2>
            {plprogram$credits && plprogram$credits.length > 0 ? (
                <ul>
                    {plprogram$credits.map((credit, index) => (
                        <li key={index}>
                            {credit.plprogram$creditType}: {credit.plprogram$personName}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No credits available</p>
            )}
        </div>
    );
}

export default MovieDetail;
