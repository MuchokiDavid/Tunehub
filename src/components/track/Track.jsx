import styles from './Track.module.css'
import AudioPlayer from '../AudioPlayer';

const Track = ({ data, addToPlaylist, removeFromPlaylist, origin, saveTrack }) => {

  // Define variables for displaying artists
  // Create artist array if there is data
  const artistArray = data?.artists?.map((artist) => artist.name) || [];
  const artists = artistArray.join(', ');

  // click handler for adding or removing track from playlist
  const clickHandler = () => {
      if (origin === 'tracklist') {
          addToPlaylist(data);
      } else {
          removeFromPlaylist(data.id); // origin === 'playlist'
      }
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
        <button onClick={clickHandler}>{origin === 'tracklist' ? '+' : '-'}</button> 
        {data.preview_url && <AudioPlayer trackUrl={data.preview_url} />}
        {!data.preview_url && <p>No preview available</p>}
      </div>
         
      </div>
  )
}

export default Track;
