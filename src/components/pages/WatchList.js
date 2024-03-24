import React, { useContext } from 'react';
import { WatchListContext } from '../context/WatchListContext';
import { Link } from 'react-router-dom';
import NotFoundImage from '../../img/notfound.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

function WatchList() {
  const { watchList, removeFromWatchList } = useContext(WatchListContext);

  return (
    <div className='item-container'>
      <h2>Watch List</h2>
      <div className='item-card'>
        {watchList.map((item, index) => (
          <div key={index} className='item'>
              <img className='item-image' src={NotFoundImage} alt='watchlist-img'/>
            <h6 className='item-title'>{item.title}</h6>
            {/* Button that removes the item from the watchlist */}
            <FontAwesomeIcon
              icon={solidHeart}
              className='heart-icon'
              onClick={() => removeFromWatchList(item.id)} // Using item.id to remove the correct item
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchList;
