import React, { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import Search from './Components/Search'
import Spinner from './Components/Spinner';
import MovieCard from './Components/MovieCard';
import { getTrendingList, updateSearchCount } from './appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query 
                        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
                        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      
      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      console.log(data);

      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'failed to load the movies!');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
      if(query && data.results.length > 0) {
        updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies, Please try again later!');
    } finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingList();
      setTrendingMovies(movies);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  },[debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies()
  },[]);

  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <h1>The <span className='text-gradient'>Cinema</span></h1>
          <img src="./assets/hero-img.png" alt="hero banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll <span className='text-gradient'>Enjoy</span> Without the <sapn className="text-gradient">Hassle</sapn></h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        {trendingMovies ? (
          <section className='trending'>
            <h2 className='mt-4'>Trending</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        ) : <></>}
        <section className='all-movies'>
          <h2>All movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {
                movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              }
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
