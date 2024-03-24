import React, { useContext } from 'react';
import { WatchListContext } from '../context/WatchListContext';

function WatchList() {
  const { watchList, removeFromWatchList } = useContext(WatchListContext);

  return (
    <div>
      <h2>Watch List</h2>
      <ul>
        {watchList.map((item, index) => (
          <li key={index}>
            {item.title}
            <button onClick={() => removeFromWatchList(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WatchList;
