import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';

export default function News() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://653e7e5d9e8bd3be29df608c.mockapi.io/films')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <Container sx={{marginTop: '6rem'}}>
      <iframe width="1176" height="630" src="https://www.youtube.com/embed/T5vdPy7nbRQ?autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          News
        </Typography>
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="div">
                  {movie.title}
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.secondary">
                  {movie.nation} ({movie.year})
                </Typography>
                <Box component="img" src={movie.img} alt={movie.title} sx={{ my: 2, width: '100%' }} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}