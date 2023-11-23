import Track from "../track/Track"
import styles from './Tracklist.module.css'

const Tracklist = ({ data, addToPlaylist, saveTrack }) => {
  // console.log(data)
    
  return (
    <div className={styles.tracklist} >
      <h2>Results</h2>
      {
        data !== undefined ?
          data.map((track, index) => <Track key={track.id} data={data[index]} addToPlaylist={addToPlaylist} origin='tracklist' saveTrack={saveTrack} />)
          :
          <h3>No Tracks yet.</h3>
      }
    </div>
    )
}

export default Tracklist;


