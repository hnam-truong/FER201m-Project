import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Detail.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';

function Detail() {
  const { id } = useParams();
  const theme = createTheme({
    palette: {
      primary: {
        main: '#008ed0',
      }
    },
  });

  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make an Axios GET request to fetch film data from the API
    axios.get(`https://653e7e5d9e8bd3be29df608c.mockapi.io/films/${id}`)
      .then(response => {
        setFilm(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="xl">
        <Grid className='des' container spacing={2}>
          <Grid item xs={7} md={4} className='des1'>
            <div className='des-left'>
              <img className='detail-poster' src={film.img} alt='' />
              <ThemeProvider theme={theme}>
                <Button href='#trailer-popup' variant="contained" className='detail-trailer'>
                  <PlayCircleOutlineIcon className='detail-trailer-logo' /> Trailer
                </Button>
              </ThemeProvider>
            </div>
          </Grid>
          <Grid item xs={7} md={8} className='des2'>
            <div className='des-right'>
              <h3 className='title'>{film.title}</h3>
              <div className='detail-label'>
                <div className='detail-nation'>
                  <label>Nation: </label>
                  <label>{film.nation}</label><br />
                </div>
                <div className='detail-year'>
                  <label>Year: </label>
                  <label>{film.year}</label>
                </div>
              </div>
              <div className='detail-des'>| DESCRIPTION |</div>
              <div className='detail-info'>
                {film.info}
              </div>
            </div>
          </Grid>
        </Grid>

        <div id='trailer-popup' className='trailer-overlay'>
          <div className='trailer-popup'>
            <div className='trailer-content'>
              <iframe className='trailer-yt' width="560" height="315" src={film.trailer}></iframe>
              <a className='trailer-close' href='#trailer-close'><HighlightOffIcon />CLOSE</a>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  )
}

export default Detail;
