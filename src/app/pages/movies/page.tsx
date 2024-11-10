import CrudList from '@/app/components/CrudList'
import { createMovie, deleteMovie, getMovies, updateMovie } from '@/app/services/movieActive'
import IMovie from '@/app/types/movieSchema';
import React from 'react'

const page = async() => {

  const movies: IMovie[] = await getMovies();
  return (
    <div>
      <CrudList
        items={movies}
        onAdd={createMovie}
        onUpdate={updateMovie}
        onDelete={deleteMovie}
        fields={['title', 'director', 'releaseYear']}
        itemType="Movie"
      />
    </div>
  )
}

export default page
