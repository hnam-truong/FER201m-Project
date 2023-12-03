import './crud.css'
import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect
import axios from 'axios';
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TheatersIcon from '@mui/icons-material/Theaters';
import TextField from '@mui/material/TextField';

function CRUD() {
    const [films, setFilms] = useState([]); // Define a state variable to store films
    const [newFilm, setNewFilm] = useState({
        title: '',
        nation: '',
        year: '',
        img: '',
        trailer: '',
        info: '',
    });

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

    const handleDeleteFilm = (filmId) => {
        const apiUrl = `https://653e7e5d9e8bd3be29df608c.mockapi.io/films/${filmId}`;

        axios
            .delete(apiUrl)
            .then((response) => {
                // Handle the successful deletion, e.g., remove the film from the state
                // and update the films state variable.
                console.log('Film deleted:', response.data);

                // You can update the films state to remove the deleted film.
                setFilms((prevFilms) => prevFilms.filter((film) => film.id !== filmId));
            })
            .catch((error) => {
                console.error('Error deleting film:', error);
            });
    };

    const handleAddFilm = () => {
        if (
            !newFilm.title ||
            !newFilm.nation ||
            !newFilm.year ||
            !newFilm.img ||
            !newFilm.trailer ||
            !newFilm.info
        ) {
            alert("Please fill in all fields before adding film.");
            return; // Do not proceed if any field is empty
        }
        const requestData = {
            title: newFilm.title,
            nation: newFilm.nation,
            year: newFilm.year,
            img: newFilm.img,
            trailer: newFilm.trailer,
            info: newFilm.info,
        };

        axios
            .post(apiUrl, requestData)
            .then((response) => {
                // After successfully adding the film, you can clear the form and refresh the film list.
                setNewFilm({
                    title: '',
                    nation: '',
                    year: '',
                    img: '',
                    trailer: '',
                    info: '',
                });
                setFilms([...films, response.data]);
            })
            .catch((error) => {
                console.error('Error adding film:', error);
            });
    };

    return (
        <div className='Home'>
            <Container maxWidth="xl">
                <a href='#addFilm' id='openPopUp'>
                    <Button
                        style={{ marginTop: "5rem", marginBottom: "-7rem", width: "98%" }}
                        fullWidth
                        variant="contained"
                    >
                        <AddCircleOutlineIcon className='add-logo' />
                        Add new film
                        <TheatersIcon className='detail-trailer-logo' />
                    </Button>
                </a>
                <div className='films' >
                    {films.map((film) => (
                        <div className='column' key={film.id}>
                            <div className='card'>
                                <img src={film.img} className='poster' alt={film.title} />
                                <h3 className='title'>{film.title}</h3>

                                <div className='nation'>
                                    <label className='nation_label'>Nation: </label>
                                    <label className='nation_c'>{film.nation}</label><br />
                                </div>
                                <div className='year'>
                                    <label className='year_label'>Year: </label>
                                    <label className='year_c'>{film.year}</label>
                                </div>
                                <div className='delete-edit-btn'>
                                    <Link to={`edit/${film.id}`}>
                                        <Button sx={{ width: '7rem', mr: '4px' }} variant="outlined" startIcon={<EditIcon />}>
                                            Edit
                                        </Button>
                                    </Link>
                                    <a>
                                        <Button sx={{ width: '7rem', ml: '4px' }} color="error" onClick={() => handleDeleteFilm(film.id)} variant="outlined" startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div id='addFilm' className='overlay'>
                        <div className='create-film'>
                            <a className='addFilm-close' href='#addFilm-close'><HighlightOffIcon /></a>
                            <TextField
                                inputProps={{ maxLength: 179 }}
                                fullWidth
                                required
                                id="outlined-required"
                                label="Title"
                                value={newFilm.title}
                                onChange={(e) => setNewFilm({ ...newFilm, title: e.target.value })}
                            />
                            <div style={{ marginTop: "1rem" }}>
                                <TextField
                                    inputProps={{ maxLength: 30 }}
                                    sx={{ width: '50%', paddingRight: '3px' }}
                                    required
                                    id="outlined-required"
                                    label="Nation"
                                    value={newFilm.nation}
                                    onChange={(e) => setNewFilm({ ...newFilm, nation: e.target.value })}
                                />
                                <TextField
                                    inputProps={{ maxLength: 4 }}
                                    sx={{ width: '50%', paddingLeft: '3px' }}
                                    required
                                    id="outlined-required"
                                    label="Year"
                                    value={newFilm.year}
                                    onChange={(e) => setNewFilm({ ...newFilm, year: e.target.value })}
                                />
                            </div>
                            <div style={{ marginTop: "1rem" }}>
                                <TextField
                                    sx={{ width: '50%', paddingRight: '3px' }}
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Image"
                                    value={newFilm.img}
                                    onChange={(e) => setNewFilm({ ...newFilm, img: e.target.value })}
                                />
                                <TextField
                                    sx={{ width: '50%', paddingLeft: '3px' }}
                                    fullWidth
                                    required
                                    id="outlined-required"
                                    label="Trailer"
                                    value={newFilm.trailer}
                                    onChange={(e) => setNewFilm({ ...newFilm, trailer: e.target.value })}
                                />
                            </div>
                            <TextField
                                style={{ marginTop: "1rem" }}
                                fullWidth
                                required
                                multiline
                                id="outlined-required outlined-multiline-static"
                                label="Information"
                                value={newFilm.info}
                                onChange={(e) => setNewFilm({ ...newFilm, info: e.target.value })}
                                rows={6}
                            />
                            <Button
                                style={{ marginTop: "1rem" }}
                                fullWidth
                                variant="contained"
                                startIcon={<AddCircleOutlineIcon />}
                                onClick={handleAddFilm}
                            >
                                Add film
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default CRUD;
