import React from 'react';
import './App.css';
import {useEffect} from "react";
// @ts-ignore
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";


const API_URL = 'https://omdbapi.com/?apikey=575beaf2';


const App = () => {
    const [movies, setMovies] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');

    const SearchMovies = async (title: any) => {
        const response = await fetch(API_URL + '&s=' + title);
        const data = await response.json();

        console.log(data.Search);
        setMovies(data.Search);
    }

    useEffect(() => {
        SearchMovies('Avicii');
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input type="text" className="search-box" placeholder="Search for a movie..." value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}/>
                <img src={SearchIcon} alt="search" onClick={() => SearchMovies(searchTerm)}/>

            </div>

            {
                movies?.length > 0 ? (
                    <div className="container">
                        {movies.map((movie: any) => <MovieCard movie={movie}/>)
                        }
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;
