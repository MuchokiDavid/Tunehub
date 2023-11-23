import { useState } from "react";
import styles from './SearchBar.module.css'

const SearchBar = ({ token, updateTracklist }) => {
    // Define states
    const [searchTerm, setSearchTerm] = useState('');

    // submit handler
    const submitHandler = async (e) => {
        e.preventDefault();

        // get search results from API
        try {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
                {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            );
        
          if (!response.ok) {
            localStorage.removeItem('token');
            window.location.reload();
            throw new Error("Network response was not ok");
          }
          
            // grab data from response
            const data = await response.json();

            // grab tracks from data
            const tracks = data.tracks.items;

            // update tracklist with tracks from API request
            updateTracklist(tracks);

        // catch error
        } catch (error) {
          console.error("Error (SearchBar):", error);
        }
      };
      

  return (
      <div className={styles.searchBar}>
        <form onSubmit={submitHandler}>
            <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} name='searchTerm' placeholder="Search....."/>
            <button type="submit" className="bg-indigo-700">SEARCH</button>
        </form>
    </div>
  )
}

export default SearchBar;
