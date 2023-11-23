import './App.css';
import Playlist from './components/playlist/Playlist';
import SearchBar from './components/searchbar/SearchBar';
import Tracklist from './components/tracklist/Tracklist';
import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Player from './components/Player';
import TopSongsComponent from './components/TopSongsComponent';
import NavBar from './components/NavBar';

function App() {
  // define states
  const [tracklist, setTracklist] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('');

  const [tokenInfo, setTokenInfo] = useState(null);

  useEffect(() => {
    const client_id = '895cc6bc8d9441319664f71c4e6e618c';
    const client_secret = '6e4ccaa5b53e48218ee11945ddcc8b74';

    const getToken = async () => {
      try {
        // Authorization request
        const authOptions = {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'grant_type=client_credentials',
        };

        // Make the authorization request
        const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
        const data = await response.json();

        // Set the token information in state
        setTokenInfo(data);
      } catch (error) {
        console.error('Error getting Spotify access token:', error);
      }
    };

    // Initial token fetch
    getToken();

    // Automatically refresh the token every hour (3600000 milliseconds)
    const refreshTokenInterval = setInterval(() => getToken(), 3600000);

    // Cleanup interval on component unmount
    return () => clearInterval(refreshTokenInterval);
  }, []);

  const token = tokenInfo?.access_token;
  //" BQBS9EqezkUG9ugndAJOmy0Tq6Jw6_x1vnBOsR7GnfWG7k7G8urm0_Ad9wmuyf1Ndy9stkPWVTuC1MsEs_umO1r0-oRiWfDiwW1nl_aaCtgP7sy4ccM"
  
  // function to update tracklist, will be called by SearchBar.js after getting results
  const updateTracklist = (array) => {
    setTracklist(array);
  }

  // function to add tracks to playlist, will be called from Track.js
  const addToPlaylist = (newTrack) => {
    // check if newTrack is already in playlist
    if (playlist.some((t) => t.id === newTrack.id)) {
    } else {
      setPlaylist((prev) => [...prev, newTrack]); // if not, it will be added
    }
    
  };

  // function to remove tracks from playlist, will be called from Track.js
  const removeFromPlaylist = (trackId) => {
    setPlaylist((prev) => prev.filter(n => n.id !== trackId));
  };

  // function to get user data
  const currentUser = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        localStorage.removeItem("token");
        window.location.reload(); 
        throw new Error('Network response was not ok');
      }
  
      const userData = await response.json();
      return userData; 

    } catch (error) {
      throw error; 
    }
  }

  // Define the currentUser function using useCallback
    const fetchCurrentUser  = useCallback(async () => {

    }, []);   
 
  // Function to create a playlist (assuming you have the user's ID)
  const createPlaylist = async (userId, playlistName, token) => {
    try {
  
      // Create the playlist
      const createResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: playlistName,
          description: "New playlist created by app",
          public: false
        })
      });
  
      if (!createResponse.ok) {
        throw new Error('Error in createPlaylist. Network response was not ok');
      }

      const playlistId = '7JD8OUPh1SqHVzlHyAgRZC';// personal playlist id
  
      let uriArray = playlist.map(track => track.uri); // create uriArray based on tracks in playlist
  
      // Add tracks to the newly created playlist
      const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: uriArray, // array of uris created above
          position: 0,
        })
      });
  
      if (!addTracksResponse.ok) {
        throw new Error('Error in adding tracks to the playlist. Network response was not ok');
      }
  
      setPlaylist([]); // reset playlist after successful playlist creation
      setPlaylistName(''); // reset playlistName after successful playlist creation
  
      alert(`Your playlist ${playlistName} was successfully created!`); // notify the user of successful playlist creation
  
      return addTracksResponse.json();
    } catch (error) {
      throw error; 
    }
  }
  const saveTrack = async (trackId) => {
    
    let curToken = token;
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${curToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ids: [
            trackId,
          ],
        })
      });
      if (!response.ok) {
        throw new Error('Error saving track');
      }

    } catch (error) {
      throw error;
    }
  }
console.log(token)
  return (

    <div className="App" style={{minHeight: '100vh'}}>
      <div className="title">
        <NavBar/>
        <SearchBar token={token} updateTracklist={updateTracklist} />
      </div>
      {token ? (
        <div className='flex'>
          <Tracklist data={tracklist} addToPlaylist={addToPlaylist} saveTrack={saveTrack} />
          <Playlist
            className='flexItem'
            playlist={playlist}
            data={tracklist}
            removeFromPlaylist={removeFromPlaylist}
            setPlaylistName={setPlaylistName}
            playlistName={playlistName}
            currentUser={currentUser}
            createPlaylist={createPlaylist}
            token={token} />   
        </div>
      )
        :
        ''
      }
      <Player/>
     {/* <TopSongsComponent tokens= {token}/> */}
    </div>
  );
}

export default App;
