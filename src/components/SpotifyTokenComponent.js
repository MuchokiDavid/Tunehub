import React, { useEffect, useState } from 'react';

const SpotifyTokenComponent = () => {
  const [tokenInfo, setTokenInfo] = useState(null);

  useEffect(() => {
    // Your Spotify API client ID and client secret
    const client_id = '895cc6bc8d9441319664f71c4e6e618c';
    const client_secret = '6e4ccaa5b53e48218ee11945ddcc8b74';

    // Authorization request options
    const authOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    };

    // Make the authorization request
    fetch('https://accounts.spotify.com/api/token', authOptions)
      .then(response => response.json())
      .then(data => {
        // Set the token information in state
        setTokenInfo(data);
      })
      .catch(error => {
        console.error('Error getting Spotify access token:', error);
      });
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div>
      {tokenInfo ? (
        <div>
          <h2>Token Information:</h2>
          <p>Access Token: {tokenInfo.access_token}</p>
          <p>Token Type: {tokenInfo.token_type}</p>
          <p>Expires In: {tokenInfo.expires_in} seconds</p>
        </div>
      ) : (
        <p>Fetching Spotify access token...</p>
      )}
    </div>
  );
};

export default SpotifyTokenComponent;
