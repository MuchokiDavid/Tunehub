import styles from './Playlist.module.css'
import Track from '../track/Track';


const Playlist = ({ playlist, removeFromPlaylist, setPlaylistName, playlistName, currentUser, createPlaylist, token }) => {

  // click handler
  const clickHandler = async () => {
    try {
      const userData = await currentUser();  // grab current user via API call defined in App.js
      const userId = userData.id; 
      await createPlaylist(userId, playlistName, token); // API call to create playlist, defined in App.js
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };
  

  return (
    <div className={styles.playlist}>
      <form className={styles.form}>
        <input
          onChange={(e) => setPlaylistName(e.target.value)}
          value={playlistName}
          name='playlist'
          placeholder='Enter playlist name' />
      </form>
      {playlist.map(
        (song, index) =>
          <Track
          key={song.id}
          data={song}
          removeFromPlaylist={removeFromPlaylist}
          origin='playlist' />
      )}
      <button type="submit" className="bg-indigo-700 mt-4" onClick={clickHandler}>Save</button>
    </div>
  )
}

export default Playlist
