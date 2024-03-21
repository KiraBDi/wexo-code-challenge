import React, { useState } from 'react';

const SearchBox = ({ searchValue, setSearchValue }) => {
    return (
        <div className='col col-sm-4'>
                <input
                    className='form-control'
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder='Type to search...'
                />
        </div>
    );
}

export default SearchBox;
