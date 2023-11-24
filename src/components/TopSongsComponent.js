import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';

const TopSongsComponent = () => {
  const token = 'BQCoMXaXcofLXaDh9u0KVbUzfPMEE7XB_9eN-EsLEQcTjoj_P1A052RUljWAMxi56-bk28VZAqgwgL3HSkIBi_KN1vclPT8nFnb8SJ4Hpj5LGvhou-A';

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
    async function fetchData() {
      const tracks = await getRecommendations();
      setRecommendedTracks(tracks);
    }

    fetchData();
  }, []);
  console.log(recommendedTracks)

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
               <p class="mt-2 text-slate-500">Looking for a goods track from Spotify to enjoy we recommend this song to do just that. Search it and listen to demo</p>
             </div>
           </div>
         </div>
        ))}
    </div>
  );
};

export default TopSongsComponent;
