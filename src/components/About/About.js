import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Button, Container } from '@mui/material';

export default function About() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: '8rem', backgroundColor: 'white', borderRadius: '6px', padding: '3rem', paddingTop: '1rem' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            About Us
          </Typography>
          <Button color="inherit" href="/">Back to Main Page</Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} sx={{marginBottom: '2rem'}}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ mt: 2 }}>
            Mission Statement
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Our mission is to provide the most comprehensive database of movies and films from all over the world. Our platform offers a seamless browsing experience and easy access to valuable information about each film.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ mt: 2 }}>
            Meet the Team
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Nam Truong - Founder and CEO
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Nem Kon - CTO and Chief Scientist
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Alpenglow - Chief Marketing Officer
          </Typography>
        </Grid>
      </Grid>

      {/* Embed Tetris Game */}
      <iframe src="https://zv1y2i8p.play.gamezop.com/g/rkWfy2pXq0r" title="Tetris Game" width="100%" height="600" frameBorder="0" scrolling="no"></iframe>
    </Container>
  );
}
