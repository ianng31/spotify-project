import React, { useEffect, useState } from 'react'
import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'
 
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'
import { Box, Typography, Button, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
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
      borderRadius: '80px',
      marginTop: '3%',
    },
    circle: {
      marginTop : '3%',
      color: '#1db954'
    }
}));
 
const App = () => {
  var token = Cookies.get('spotifyAuthToken')
  const classes = useStyles();
  const [state] = React.useState({
    checkedB: false,
  });

  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const getCookies = async () => {      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      token = Cookies.get('spotifyAuthToken')
      token && setAuthenticated(true)
    }

    getCookies()

  }, [])

  const [showButton, setShowtButton] = useState(true)
  const [generated, setGenerated] = useState(false)

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  //   if (event.target.checked) {
  //     console.log('yes yes')
  //   }
  // };

  document.body.style.backgroundColor = 'white';

  token && console.log(`You are authorized with token: ${token}`)

  return (
    <div className={classes.app}>
      {authenticated ? (
        <SpotifyApiContext.Provider value={token}>

          {/* Your Spotify Code here */}
          <Box className={classes.box}>
            <Typography variant='h5' className={state.checkedB ? classes.whiteText : classes.text}> 
            For this feature to work please go to Spotify first and <b>FOLLOW/LIKE ALL</b> of your <b>Daily Mix</b> playlists  <b>before</b> generating.
            </Typography>
            {(showButton) 
              ?             
                <Button 
                onClick={() => createDiscoverDaily(token, setShowtButton, setGenerated)}
                className={classes.button}
                >
                  Generate My Discover Daily
                </Button>
              :
                generated ? <Typography variant='h2' className={classes.textTitle}>
                Discover Daily by Ian has 
                been successfully generated.
                Open in Spotify playlists to listen
              </Typography> : <CircularProgress size={100} className={classes.circle}/>
            }


          </Box>
        </SpotifyApiContext.Provider>
      ) : (
        // Display the login page
        <Box className={classes.box}>
          <Typography className={classes.textTitle} variant='h1'>Discover Daily</Typography>
          <Typography className={classes.text} >
            Discover Daily extracts songs from your Daily Mix albums that aren't aready in one of your existing playlists
            and creates a complete playlist of just new songs.
          </Typography>

          <SpotifyAuth
            redirectUri={REDIRECT_URI}
            clientID={CLIENT_ID}
            scopes={
              [
                Scopes.playlistReadPrivate, 
                Scopes.playlistModifyPublic, 
                Scopes.playlistReadCollaborative,
                Scopes.userLibraryRead
              ]
            }
          />
        </Box>
      )}
    </div>
  )
}
export default App