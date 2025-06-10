import React from 'react'

const MovieCard = ({movie : 
    { title, vote_average, poster_path, release_date, original_language }}) => {
  return (
    <div className='movie-card'>
<<<<<<< HEAD
      <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : './assets/No-poster.png'} alt={title} />
=======
      <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : 'src/assets/No-poster.png'} alt={title} />
>>>>>>> 60d6aa4ac8ec34c65949ebe9ef7ab00459596c25

      <div className='mt-4'>
        <h3>{title}</h3>

        <div className='content'>
            <div className='rating'>
<<<<<<< HEAD
                <img src="./assets/star.svg" alt="star-icon" />
=======
                <img src="src/assets/star.svg" alt="star-icon" />
>>>>>>> 60d6aa4ac8ec34c65949ebe9ef7ab00459596c25
                <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            </div>

            <span>•</span>

            <p className='lang'>{original_language ? original_language : 'NL'}</p>
            
            <span>•</span>

            <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
