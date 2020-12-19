import React from 'react'
import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'
 
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'
import { Box, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import GiantSwitch  from './Components/GiantSwitch'
import { createDiscoverDaily } from './Utils/index'
import {CLIENT_ID, REDIRECT_URI} from './Utils/constants'

const useStyles = makeStyles(() => ({
  box: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      height: '100vh',
      width: '100vw',
      textAlign: 'center'
    },
    app: {
      width: '100%',
      height: '100%',
    },
    text: {
      marginBottom: '2%',
    },
    whiteText: {
      color: 'white',
      marginBototm: '2%'
    },
    textTitle: {
      color: '#1db954',
      marginBottom: '2%',
    },
    button: {
      backgroundColor: '#1db954',
      color: 'white',
      width: '70vw',
      Height: '50vh',
      fontSize: '4vw',
      borderRadius: '80px'
    }
}));
 
const App = () => {
  const token = Cookies.get('spotifyAuthToken')
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedB: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (event.target.checked) {
      console.log('yes yes')
    }
  };

  document.body.style.backgroundColor = 'white';

  token && console.log(`You are authorized with token: ${token}`)

  return (
    <div className={classes.app}>
      {token ? (
        <SpotifyApiContext.Provider value={token}>
          {/* Your Spotify Code here */}
          <Box className={classes.box}>
            <Typography className={state.checkedB ? classes.whiteText : classes.text}>Disclaimer: At the moment Spotify has not made an API for the daily mix playlists. 
            For this feature to work please add all of your daily mix playlists to your library.
            </Typography>
            <Button 
            onClick={() => createDiscoverDaily(token)}
            className={classes.button}
            >
              Generate Discover Daily
            </Button>
          </Box>
        </SpotifyApiContext.Provider>
      ) : (
        // Display the login page
        <Box className={classes.box}>
          <Typography className={classes.textTitle} variant='h1'>Discover Daily</Typography>
          <Typography className={classes.text} >
            Extract the songs you haven't heard of from the daily mix playlists every day
            for a complete playlist of just new songs.
          </Typography>

          <SpotifyAuth
            redirectUri={REDIRECT_URI}
            clientID={CLIENT_ID}
            scopes={
              [
                Scopes.playlistReadPrivate, 
                Scopes.playlistModifyPublic, 
                Scopes.playlistReadCollaborative
              ]
            }
          />
        </Box>
      )}
    </div>
  )
}
export default App