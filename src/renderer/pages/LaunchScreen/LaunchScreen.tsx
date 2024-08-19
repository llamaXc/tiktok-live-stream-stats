/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
// AppLaunchPage.tsx

import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, Alert, Snackbar  } from '@mui/material';
import './LaunchScreen.scss'; // Import the SCSS file for styling
import {connectToTikTok} from './api'
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import AnimatedChart from '@components/Charts/AnimatedChart';
import storeState from '../../state/store';


interface AppLaunchPageProps {}

const loadingSentences = [
  'Connecting old wires...',
  'Twisting with a wrench.',
  'Applying duck tape!',
  'Tighting screw driver?',
  'Hang tight!',
  'Just a few more seconds...',
];

const LaunchScreen: React.FC<AppLaunchPageProps> = () => {
    const [username, setUsername] = useState<string>('');
    const [connecting, setConnecting] = useState<boolean>(false)
    const [randomSentence, setRandomSentence] = useState(
      loadingSentences[0]
    );
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');

    const { latestErrorMessage, setConnectedUsername, dismissErrorMessage } = storeState();

    useEffect(() => {
      const intervalId = setInterval(() => {
        const randomIndex = Math.floor(
          Math.random() * loadingSentences.length
        );
        setRandomSentence(loadingSentences[randomIndex]);
      }, 1500); 

      return () => clearInterval(intervalId);
    }, [connecting, randomSentence]);

    const handleConnect = () => {

      const ipcRenderer = (window as any).ipcRenderer
      ipcRenderer.on("user_not_found", (username: string) => {
        setConnecting(false)
        setToastMessage(`User "${username}" not found`);
        setShowToast(true);
      })

      setConnecting(true)
      connectToTikTok(username)
      setConnectedUsername(username);
    };

    useEffect(() => {
      if (latestErrorMessage.dismissed === false){
        setConnecting(false)
      }
    }, [latestErrorMessage]);
  


  if (connecting){
    return (    
      <Paper className="loadingBox">
        <h1>{randomSentence}</h1>
        <CircularProgress />
      </Paper>
    )
  }

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <>
    <Paper className="app-launch-container">
         <Grid container spacing={0} direction="column">

          {latestErrorMessage.dismissed === false &&
          <Alert severity="success" color="error" onClose={() => {dismissErrorMessage()}}>
              {latestErrorMessage.message}
            </Alert>
          }
          <Grid  className="title-paper">
              <Typography variant="h5">        
                TikTok Stream Portal
              </Typography>
              <p>Version 0.2</p>
          </Grid>

          <Grid className="username-paper">
              <TextField
                label="TikTok Username"
                className="username-input"
                onChange={(e: any) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleConnect()
                  }
                }}
              />
          </Grid>

          <Grid className="connect-container">
            <Button
              variant="contained"
              color="primary"
              className="launch-screen-connect-button"
              onClick={handleConnect}
              disabled={username === ''}
            >
                Connect
            </Button> 
          </Grid> 
         </Grid>
    </Paper>

      <div style={{width: "100%", margin: "0px", height: "200px"}}>
        <AnimatedChart/>
      </div>

      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={handleToastClose}
        message={toastMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};

export default LaunchScreen;
