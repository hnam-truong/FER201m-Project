import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function FilmPresentaion({ films }) {
    const [film, setFilm] = useState([])

    console.log(films);
    return (
        <Container maxWidth="xl" >
            <div className='films'>
                {films.map((film) => (
                    <div className='column' key={film.id}>
                        <div className='card' >
                            <Link to={`detail/${film.id}`}>
                                <img src={film.img} className='poster' />
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
                        <img src={film.img} />
                        <h3>{film.title}</h3>
                        <a className='close' href='#close'><HighlightOffIcon/></a>
                        <div className='content'>
                            {film.info}
                        </div>
                    </div>
                </div>
            </div>
            </Container>
    )
}
