import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Series from './components/pages/Series.js';
import Movies from './components/pages/Movies.js';
import Home from './components/pages/Home.js';
import MovieDetail from "./components/pages/MovieDetail.js";
import SerieDetails from "./components/pages/SerieDetails.js";

function App() {


  return (
    <div className='container-fluid wexo-code-challenge'>
      <div className='row'>
        <div className='col'>
          <div className='row'>
            <Header />
          </div>
          <Routes>
            <Route path='/' element={<Home/>}/>  {/* Handles routing to the Home page, when clicking the logo */}
            <Route path='/Movies' element={<Movies/>} /> {/* Handles routing to the Movies page, when clicking the Movies button */}
            <Route path='/Series' element={<Series/>} /> {/* Handles routing to the Series page, when clicking the Series button */}
            <Route path='/Movie/:movieId' element={<MovieDetail />}/> {/* Handles routing to the MovieDetails page, when clicking a movie */}
            <Route path='/Serie/:serieId' element={<SerieDetails/>}/> {/* Handles routing to the MovieDetails page, when clicking a movie */}
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  )
};


export default App;