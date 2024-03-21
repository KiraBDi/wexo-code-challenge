import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetail() {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/${movieId}?form=json`);
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
        <div>
            <h1>{title}</h1>
            <p>Description: {description}</p>
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
