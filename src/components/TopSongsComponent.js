import React, { useState, useEffect } from 'react';

const token = 'BQAf6THQkbPrCQmEyo23ud5WQLF3wRja6A6ZadsWAak13CNQRtbuL4rtUxabPs436dPyfnnBYYSfKbZwXb0_eTiCLgqn7POn8wRd3JyaRXb9DaY2iFM';

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

const TopSongsComponent = () => {
  const [recommendedTracks, setRecommendedTracks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const tracks = await getRecommendations();
      setRecommendedTracks(tracks);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Top 5 Recommended Songs</h2>
      <ul>
        {recommendedTracks.map(({ name, artists, id }) => (
          <li key={id}>
            {`${name} by ${artists.map((artist) => artist.name).join(', ')}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSongsComponent;