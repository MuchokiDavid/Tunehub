import React from 'react'

function Player() {
    const playlistId = '7JD8OUPh1SqHVzlHyAgRZC';
  return (
    <div className='flex justify-center'>
        <iframe
            title="Recommendation Playlist "
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
            width="80%"
            height="100%"
            className='justify-self-center mt-5 w-full'
            style={{ minHeight: '750px'}}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
        />
    </div>
  )
}

export default Player