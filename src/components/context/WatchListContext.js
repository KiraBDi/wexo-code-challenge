import React, { createContext, useState } from 'react';

export const WatchListContext = createContext();

export const WatchListProvider = (props) => {
  const [watchList, setWatchList] = useState([]);

  const addToWatchList = (item) => {
    setWatchList([...watchList, item]);
  };

  const removeFromWatchList = (id) => {
    const newList = [...watchList];
    newList.splice(id, 1);
    setWatchList(newList);
  };

  return (
    <WatchListContext.Provider value={{ watchList, addToWatchList, removeFromWatchList }}>
      {props.children}
    </WatchListContext.Provider>
  );
};

