'use client'
import CrudList from '@/app/components/CrudList'
import { createMovie, deleteMovie, getMovies, updateMovie } from '@/app/services/movieActive'
import IMovie from '@/app/types/movieSchema';
import React, { useEffect, useState } from 'react'

const Page = () => {

  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try{
      const data = await getMovies();
      setMovies(data || []);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setMovies([]); 
    }
    };
    fetchMovies();
  }, []);

  
  const handleCreate = async(movieData: IMovie) => {
    await createMovie(movieData);
    const updatedMovies = await getMovies();
    setMovies(updatedMovies);
  };

  const handleUpdate = async(id: string, movieData: IMovie) => {
    await updateMovie(id, movieData);
    const updatedMovies = await getMovies();
    setMovies(updatedMovies);
  };

  const handleDelete = (id: string) => {
    deleteMovie(id);
    setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
  };
  
  return (
    <div>
      <CrudList
        items={movies}
        onAdd={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        fields={['title', 'director', 'releaseYear']}
        itemType="Movie"
      />
    </div>
  )
}

export default Page
