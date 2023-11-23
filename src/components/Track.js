import styles from './Track.module.css'

const Track = ({ data, addToPlaylist, removeFromPlaylist, origin, saveTrack }) => {

  // Define variables for displaying artists
  // Create artist array if there is data
  const artistArray = data?.artists?.map((artist) => artist.name) || [];
  // Concatenate artists, seperated by a comma
  const artists = artistArray.join(', ');

  // click handler for adding or removing track from playlist
  const clickHandler = () => {
      if (origin === 'tracklist') {
          addToPlaylist(data);
      } else {
          removeFromPlaylist(data.id); // origin === 'playlist'
      }
  }

  const onSave = () => {
    saveTrack(data.id);
  }

  return (
      <div key={data.id} className={styles.track}>
        <div className={styles.info}>
          <img src={data.album.images[2].url} alt={data.name}/>
          <div className={styles.trackinfo}>
            <h4>{data.name}</h4>
            <p>{artists}</p>
          </div>
          
      </div>
      <div className={styles.btns}>
        {origin === 'tracklist' ? <button className={styles.saveBtn} onClick={onSave}>Save Track</button> : ''}
        <button onClick={clickHandler}>{origin === 'tracklist' ? '+' : '-'}</button> 

      </div>
         
      </div>
  )
}

export default Track;
