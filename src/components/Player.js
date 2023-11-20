import React from 'react'

function Player() {
    const playlistId = '7JD8OUPh1SqHVzlHyAgRZC';
  return (
    <div>
        <h3>Listen to music here</h3>
        <iframe
            title="Spotify Embed: Recommendation Playlist "
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
            width="100%"
            height="100%"
            style={{ minHeight: '360px' }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
        />
    </div>
  )
}

export default Player