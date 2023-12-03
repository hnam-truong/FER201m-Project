import './Home.css';
import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect
import axios from 'axios';
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Home() {
    const [films, setFilms] = useState([]); // Define a state variable to store films
    const [film, setFilm] = useState({}); // Define a state variable for the selected film

    const apiUrl = 'https://653e7e5d9e8bd3be29df608c.mockapi.io/films';

    useEffect(() => {
        // Use useEffect to fetch data when the component mounts
        axios.get(apiUrl)
            .then(function (response) {
                console.log('Data:', response.data);
                setFilms(response.data); // Update the films state with the fetched data
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    }, []); // The empty dependency array ensures this effect runs only once on mount

    return (
        <div className='Home'>
            <Container maxWidth="xl">
                <div className='films'>
                    {films.map((film) => (
                        <div className='column' key={film.id}>
                            <div className='card'>
                                <Link to={`detail/${film.id}`}>
                                    <img src={film.img} className='poster' alt={film.title} />
                                    <h3 className='title'>{film.title}</h3>
                                </Link>

                                <div className='nation'>
                                    <label className='nation_label'>Nation: </label>
                                    <label className='nation_c'>{film.nation}</label><br />
                                </div>
                                <div className='year'>
                                    <label className='year_label'>Year: </label>
                                    <label className='year_c'>{film.year}</label>
                                </div>
                                <p><a href='#popup1' id='openPopUp'><button className='detail' onClick={() => { setFilm(film) }}>More</button></a></p>
                            </div>
                        </div>
                    ))}
                    <div id='popup1' className='overlay'>
                        <div className='popup'>
                            <img src={film.img} alt={film.title} />
                            <h3>{film.title}</h3>
                            <a className='close' href='#close'><HighlightOffIcon /></a>
                            <div className='content'>
                                {film.info}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home;
