import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import NotFoundImg from '../../img/notfound.png';

function MovieDetail() {
    const { movieId } = useParams(); // Get the movie URL from params
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        console.log("Movie ID: ", movieId)
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
                const response = await fetch(`https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/${movieId}?form=json&fields=title,description,plprogram$credits&lang=en`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                const data = await response.json();
                setMovieDetails({
                    title: data.title,
                    description: data.description,
                    credits: data.plprogram$credits,

                });
            } catch (error) {
                console.error('Error fetching movie details: ', error);
            }
        };

        fetchMovieDetails();
    }, [movieId]); 

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    const { title, description, credits } = movieDetails;

    return (
        <div className='details-container'>
            <h1>{title}</h1>
            <div className='img-description-container'>
                <img src={NotFoundImg} className='img'/>
                <div>
                    <h4 className='description-title'>Description</h4>
                    <p className='description'>{description}</p>
                </div>
            </div> 
            <h2>Credits</h2>
            {credits && credits.length > 0 ? (
                <ul>
                    {credits.map((credit, index) => (
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
