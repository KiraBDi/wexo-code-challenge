import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import WexoLogo from '../img/wexologo.png';

function Header() {
    return (
        <div className='header'>
            <nav>
                <Link to="/" className='header-title'>
                    <img src={WexoLogo} />
                    WEXO Movies
                    <img src={WexoLogo} />
                </Link>
            <ul>
                <li>
                <NavLink to='/Movies'>Movies</NavLink>
                </li>
                <li>
                <NavLink to='/Series'>Series</NavLink>
                </li>
                <li>
                <NavLink to='/Watchlist'>Watchlist</NavLink>
                </li>
            </ul>
            </nav>
        </div>
    );
}

export default Header;


