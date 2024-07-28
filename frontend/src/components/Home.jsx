import React from 'react';
import { Box, Grid, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        padding: 2
      }}
    >
      <Box
        sx={{
          height: '90%',
          width: 850,
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid #f0f0f0',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: 2
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="center"
              sx={{
                backgroundColor: '#b388ff',
                color: 'white',
                p: 2,
                borderRadius: '4px'
              }}
            >
              Contacts
            </Typography>
          </Grid>
        
          <Grid item xs={12} sx={{ flex: 1 }}>
            <Outlet /> {/* This will render either ContactListComponent or FormComponent based on the route */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;
