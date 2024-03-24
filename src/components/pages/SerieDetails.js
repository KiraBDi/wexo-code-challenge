import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import ShowImage from '../../img/show.png';

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

export default SerieDetails;
