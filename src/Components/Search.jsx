import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
        <div>
<<<<<<< HEAD
            <img src="./assets/Vector.svg" alt="search" />
=======
            <img src="src/assets/Vector.svg" alt="search" />
>>>>>>> 60d6aa4ac8ec34c65949ebe9ef7ab00459596c25
            <input 
                type='text'
                placeholder='Search through thousands of movies'
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
        </div>
    </div>
  )
}

export default Search
