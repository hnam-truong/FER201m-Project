import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

function Edit() {
  const navigate = useNavigate();

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

  const handleUpdateFilm = () => {
    if (
      !film.title ||
      !film.nation ||
      !film.year ||
      !film.img ||
      !film.trailer ||
      !film.info
    ) {
      alert("Please fill in all fields before save film.");
      return; // Do not proceed if any field is empty
    }

    // Make a PUT request to update the film data
    axios.put(`https://653e7e5d9e8bd3be29df608c.mockapi.io/films/${id}`, film)
      .then(response => {
        console.log('Film updated:', response.data);
        navigate('/crud');
      })
      .catch(err => {
        console.error('Error updating film:', err);
      });
  };

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
            </div>
          </Grid>
          <Grid item xs={12} md={8} className='des2'>
            <div className='des-right-edit'>
              <TextField
                inputProps={{ maxLength: 179 }}
                fullWidth
                required
                id="outlined-required"
                label="Title"
                defaultValue={film.title}
                onChange={(e) => setFilm({ ...film, title: e.target.value })}
              />
              <div style={{ marginTop: "1rem" }}>
                <TextField
                  inputProps={{ maxLength: 30 }}
                  sx={{ width: '50%', paddingRight: '3px' }}
                  required
                  id="outlined-required"
                  label="Nation"
                  defaultValue={film.nation}
                  onChange={(e) => setFilm({ ...film, nation: e.target.value })}
                />
                <TextField
                  inputProps={{ maxLength: 4 }}
                  sx={{ width: '50%', paddingLeft: '3px' }}
                  required
                  id="outlined-required"
                  label="Year"
                  defaultValue={film.year}
                  onChange={(e) => setFilm({ ...film, year: e.target.value })}
                />
              </div>
              <div style={{ marginTop: "1rem" }}>
                <TextField
                  sx={{ width: '50%', paddingRight: '3px' }}
                  fullWidth
                  required
                  id="outlined-required"
                  label="Image"
                  defaultValue={film.img}
                  onChange={(e) => setFilm({ ...film, img: e.target.value })}
                />
                <TextField
                  sx={{ width: '50%', paddingLeft: '3px' }}
                  fullWidth
                  required
                  id="outlined-required"
                  label="Trailer"
                  defaultValue={film.trailer}
                  onChange={(e) => setFilm({ ...film, trailer: e.target.value })}
                />
              </div>
              <TextField
                style={{ marginTop: "1rem" }}
                fullWidth
                required
                multiline
                id="outlined-required outlined-multiline-flexible"
                label="Information"
                defaultValue={film.info}
                onChange={(e) => setFilm({ ...film, info: e.target.value })}
                maxRows={10}
              />
              <Button
                style={{ marginTop: "1rem" }}
                fullWidth
                onClick={handleUpdateFilm}
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Edit;
