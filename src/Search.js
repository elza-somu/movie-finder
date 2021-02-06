import React ,{useState} from "react";
import MovieCard from "./MovieCard"

export default function Search(){
  // user input state
  const[query, setQuery] = useState('');

  const[movies, setMovies] = useState([]);

  const searchMovies = async(e) =>{
    e.preventDefault();
  

    const url = `https://api.themoviedb.org/3/search/movie?api_key=339b6f34e65d2673cee352f6fd0e57ad&language=en-US&query=${query}&page=1&include_adult=false`;
  

    try{
      const res = await fetch(url);
      const data  = await res.json();
      setMovies(data.results)
    } catch(err){
      console.error(err);
    }
  }
    
    return (
      <>
        <form className="form container" onSubmit={searchMovies}>
            <label className="label hidden" htmlFor="query">Movie Name</label>
            <input className="input" type="text" name="query" placeholder=" ie Sunrise Bay.."
              value ={query} onChange={(e)=> setQuery(e.target.value)}
            />
            <button className="button" type="submit">Search</button>
        </form>
        <div className="card-list">
          {movies.filter(movie => movie.poster_path).map(movie => (
          <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </> 
    )
}
