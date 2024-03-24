import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import ShowImage from '../../img/show.png';
import NotFoundImg from '../../img/notfound.png';

function SerieDetails() {
    const { serieId } = useParams();
    const [serieDetails, setSerieDetails] = useState(null);

    useEffect(() => {
        console.log("Serie ID: ", serieId);
        const fetchSerieDetails = async () => {
            try {
                const response = await fetch(`https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/?form=json&lang=da&bySeriesId=${serieId}&fields=title,description,plprogram$credits`);
                if (!response.ok) {
                    throw new Error('Failed to fetch serie details');
                }
                const data = await response.json();
                const serie = data.entries[0];
                setSerieDetails({ title: serie.title, description: serie.description, plprogram$credits: serie.plprogram$credits });
            } catch (error) {
                console.error('Error fetching serie details: ', error);
            }
        };

        fetchSerieDetails();
    }, [serieId]);

    if (!serieDetails) {
        return <div>Loading...</div>;
    }

    const { title, description, plprogram$credits } = serieDetails;

    const renderCredits = () => {
        if (plprogram$credits && plprogram$credits.length > 0) {
            const directors = plprogram$credits.filter(credit => credit.plprogram$creditType === 'director');
            const actors = plprogram$credits.filter(credit => credit.plprogram$creditType === 'actor');

            return (
                <div>
                    <h3>Directors:</h3>
                    <ul>
                        {directors.map((director, index) => (
                            <li key={index}>{director.plprogram$personName}</li>
                        ))}
                    </ul>

                    <h3>Actors:</h3>
                    <ul>
                        {actors.map((actor, index) => (
                            <li key={index}>{actor.plprogram$personName}</li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return <p>No credits available</p>;
        }
    };

    return (
        <div className='details-container'>
            <h1>{title}</h1>
            <div className='img-description-container'>
                <img src={ShowImage} alt='show' className='img'/>
                <div>
                    <h4>Description</h4>
                    <p className='description'>{description}</p>
                </div>
            </div>
            <h2>Credits</h2>
            {renderCredits()}
        </div>
    );
}

export default SerieDetails;
