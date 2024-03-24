import React, {useState} from 'react';

function WatchList() {
    const [WatchList, setWatchList] = useState(() => {
        const storedWatchList = localStorage.getItem('watchlist');
        return storedWatchList ? JSON.parse(storedWatchList) : [];
    });

    const addToWatchList = (movie) => {
        setWatchList((prevWatchList) => {
            const updatedWatchList = [...prevWatchList, movie];
            localStorage.setItem('watchlist', JSON.stringify(updatedWatchList));
            return updatedWatchList;
        });
    };

    const removeFromWatchList = (movieId) => {
        setWatchList((prevWatchList) => {
            const updatedWatchList = prevWatchList.filter((movie) => movie.id !== movieId);
            localStorage.setItem('watchlist', JSON.stringify(updatedWatchList));
            return updatedWatchList;
        });
    };

    return (
        <div>
            <h2>WatchList</h2>
            {WatchList.length === 0 ? (
                <p>Your watchlist is empty.</p>
            ) : ( 
                <ul>
                    {WatchList.map((movie) => (
                        <li key={movie.guid}> 
                            {movie.title} <button onClick={() => removeFromWatchList(movie.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default WatchList;