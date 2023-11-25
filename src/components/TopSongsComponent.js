import React, { useState, useEffect } from 'react';

const TopSongsComponent = () => {
  const [tokenInfo, setTokenInfo] = useState(null);
  const [loading, setLoading] = useState(true); 

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

        if (data && data.access_token) {
          // Set the token information in state
          setTokenInfo(data);
        } else {
          console.error('Invalid token data:', data);
        }
      } catch (error) {
        console.error('Error getting access token:', error);
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }
    };

    // Initial token fetch
    getToken();

    // Automatically refresh the token every hour (3600000 milliseconds)
    const refreshTokenInterval = setInterval(() => getToken(), 3600000);

    // Cleanup interval on component unmount
    return () => clearInterval(refreshTokenInterval);
  }, []);

  useEffect(() => {
    // Code to execute after the token has been fetched successfully
    if (tokenInfo && tokenInfo.access_token) {
      // Call your function or perform any actions that require the token
    }
  }, [tokenInfo]); 

  const token = tokenInfo?.access_token;

  async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: JSON.stringify(body),
    });
    return await res.json();
  }

  const topTracksIds = [
    '047fCsbO4NdmwCBn8pcUXl',
    '0iqY4f4lNp2Bh1rthklY1q',
    '6vy5gmpM2yuLAhDRtGOtPw',
    '0qZbRZcJw0Hj9oCDc7yaW3',
    '2hcohLIysMxofYziluXCoX',
  ];

  async function getRecommendations() {
    return (await fetchWebApi(
      `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`,
      'GET'
    )).tracks;
  }

  const [recommendedTracks, setRecommendedTracks] = useState([]);

  useEffect(() => {
    if (!loading) {
      // Only fetch recommendations when the token is available
      async function fetchData() {
        const tracks = await getRecommendations();
        setRecommendedTracks(tracks);
      }

      fetchData();
    }
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>; // You can customize the loading indicator
  }

  return (
    <div className='mt-8 mb-8 bg-indigo-700'>
      <h2 className='text-3xl	text-white'>Top 5 Recommended Songs</h2>
      {recommendedTracks.map(({ name, artists, id }) => (
        <div class="w-85 mx-auto bg-white rounded-xl shadow-md overflow-hidden" key={id}>
          <div class="flex">
            <div class="shrink-0">
              <img class="h-48 w-full object-cover md:h-full md:w-48" src="https://img.freepik.com/free-vector/musical-notes-frame-with-text-space_1017-32857.jpg" alt="Modern building architecture"/>
            </div>
            <div class="p-8">
              <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold ml-8">{name}</div>
              <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{artists.map((artist) => artist.name).join(', ')}</a>
              <p class="mt-2 text-slate-500">Looking for a good track from Spotify to enjoy? We recommend this song. Search it and listen to the demo.</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopSongsComponent;
