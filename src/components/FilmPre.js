import React from 'react'

export default function FilmPresentaion({ films }) {
    console.log(films);
    return (
        <div className='container'>
            {films.map((film) => (
                <div className='column' key={film.id}>
                    <div className='card' >
                        <img src={film.img} className='poster' />
                        <h3 className='title'>{film.title}</h3>
                        <div className='nation'>
                            <label className='nation_label'>Nation: </label>
                            <label className='nation_c'>{film.nation}</label><br />
                        </div>
                        <div className='year'>
                            <label className='year_label'>Year: </label>
                            <label className='year_c'>{film.year}</label>
                        </div>
                        <p><button className='detail'>More</button></p>
                    </div>
                </div>
            ))}</div>
    )
}
