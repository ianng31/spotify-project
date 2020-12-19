import {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI} from './constants'


let SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
let spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
});

const clearDiscoverDaily = async (accessToken) => {
  spotifyApi.setAccessToken(accessToken);
  
  spotifyApi.getMe()
  .then(data => {
      return {display_name: data.body.display_name, id: data.body.id}
  })
  .then(async userInfo => {

      spotifyApi.getUserPlaylists(userInfo.id, { limit: 50 })
        .then(async (data) => {
          //console.log('Retrieved playlists', data.body.items[0]);
            //data.body.items.forEach(item => console.log(item.name))
  
            const clearPlaylist = async () => {
              let testPlaylist = data.body.items.find(obj => obj.name === "Discover Daily by Ian")
              
              if (testPlaylist !== undefined) {
                let total = testPlaylist.tracks.total
                while (total > 0) {
                    let p = await spotifyApi.getPlaylist(testPlaylist.id)
                    let tracksToRemove = p.body.tracks.items.map(x => {
                      return {"uri" : x.track.uri}
                    }) 
                    
                    console.log(tracksToRemove)
                    
                    await spotifyApi.removeTracksFromPlaylist(testPlaylist.id, tracksToRemove)
                    .then(() => console.log('successfully deleted'))
                    .catch(err => console.log('Something went wrong!', err))
                    
                    total += -100
                }                
                let newTest = await spotifyApi.getPlaylist(testPlaylist.id)
                console.log("should now be empty", newTest.body.tracks.total)
              }

              console.log('done')
            }

            clearPlaylist()
            
            console.log('pls')
        })
        
    })
}

export const createDiscoverDaily = (accessToken) => {

  spotifyApi.setAccessToken(accessToken);
  
  let mySetNames = new Set()
  let mySetIDs = new Set()
  
  spotifyApi.getMe()
  .then(data => {
      return {display_name: data.body.display_name, id: data.body.id}
  })
  .then(async userInfo => {
      console.log(userInfo.id)
  
      spotifyApi.getUserPlaylists(userInfo.id, { limit: 50 })
        .then(async (data) => {
          //console.log('Retrieved playlists', data.body.items[0]);
            //data.body.items.forEach(item => console.log(item.name))
  
            const createPlaylist = async () => {
              let testPlaylist = data.body.items.find(obj => obj.name === "Discover Daily by Ian")
              
              if (testPlaylist === undefined) {
                const data = await spotifyApi.createPlaylist('Discover Daily by Ian', { 'description': 'My description', 'public': true })
                .then(() => console.log('created playlist!'))
              }
            }
            
            await clearDiscoverDaily(accessToken)
            await createPlaylist()
              
            let d = await spotifyApi.getUserPlaylists(userInfo.id, {limit : 50})
            let discoverDaily = d.body.items.find(obj => obj.name === "Discover Daily by Ian")
  
            console.log('getting discoverDaily', discoverDaily !== undefined)
  
            if (discoverDaily !== undefined) {
              let dailyMixes = data.body.items.filter(item => item.name.startsWith('Daily Mix'))
              let remainingPlaylists = data.body.items.filter(item => !item.name.startsWith('Daily Mix'))
              remainingPlaylists = remainingPlaylists.filter(item => !item.name.startsWith('Discover'))
              remainingPlaylists = remainingPlaylists.filter(item => item.owner.id === userInfo.id)
              
              async function populateSet () { 
                
                for (const x of remainingPlaylists) {
                  let remainingSongs = x.tracks.total;
                  //console.log(x.name + " has " + remainingSongs)
                  let offset = 0
                  while (remainingSongs - 100 > 0) {
  
                    let playlist = await spotifyApi.getPlaylist(x.id)
                    let tracks = await spotifyApi.getPlaylistTracks(playlist.body.id, {limit : 100, offset : offset})
                    let items = tracks.body.items
                    items.forEach(x => {
                      if (x != null && x.track != null) {
                        mySetIDs.add(x.track.id)
                        mySetNames.add(x.track.name)
                        //console.log(x.track.name)
                      }
                    })
                    offset += 100
                    remainingSongs -= 100
                  }
                  //console.log('===================there are', remainingSongs, "remaining=========================")
  
                  if (remainingSongs > 0) {
                    let playlist = await spotifyApi.getPlaylist(x.id)
                    let tracks = await spotifyApi.getPlaylistTracks(playlist.body.id, {limit : remainingSongs, offset : offset})
  
                    let items = tracks.body.items
                    items.forEach(x => {
                      if (x != null && x.track != null) {
                        mySetIDs.add(x.track.id)
                        mySetNames.add(x.track.name)
                        //console.log(x.track.name)
                      }
                    })
                    
                  }
  
                }
                console.log('finished populating')
              }
              
              async function filterSongs () {
                for (const x of dailyMixes) {
                  let playlist = await spotifyApi.getPlaylist(x.id)    
                  
                  let tracks = playlist.body.tracks
                  let items = tracks.items
                  let tracksToAdd = []
                  
                  //console.log("==============",x.name,"=============")
  
                  items.forEach(x => {
                    if (!mySetIDs.has(x.track.id) && !mySetNames.has(x.track.name)) {
                      //console.log(x.track.name)
                      tracksToAdd.push(x.track.uri)
                    }
                  })

                  //console.log(tracksToAdd)
                  await spotifyApi.addTracksToPlaylist(discoverDaily.id, tracksToAdd)
                  .then(function(data) {
                    console.log('Added tracks to playlist!');
                  }, function(err) {
                    console.log('Something went wrong!', err);
                  });
                }
                
                console.log('finished filtering')
              }
              
              await populateSet().catch(x => console.log(x))
              console.log(mySetIDs.size, mySetNames.size);
              await filterSongs()
            }
            
  
            console.log('pls')
        })
        
    })
}

