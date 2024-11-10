import axios from "axios";

export const getMovies=async()=>{
  try{
    const response = await axios.get('/api/movie');
    const data = response.data;
    return data;
  }catch(error){
    console.error('Error get movies:', error);
  }
}

export const createMovie=async(movie:{title: string; director:string; releaseYear:string})=>{
    try{
      const response = await axios.post('/api/movie', movie);
      const data = response.data;
      console.log('Movie created:', data);
      return data;
    }catch(error){
      console.error('Error creating movie:', error);
    }
  }

  export const updateMovie=async(id: string, movie:{title: string; director:string; releaseYear:string})=>{
    try{
      const response = await axios.put(`/api/movie${id}`, movie);
      const data = response.data;
      console.log('Movie updated:', data);
      return data;
    }catch(error){
      console.error('Error updating movie:', error);
    }
  }

  export const deleteMovie=async(id: string)=>{
    try{
      const response = await axios.delete(`/api/movie/${id}`);
      const data = response.data;
      console.log('Movie deleted:', data);
      return data;
    }catch(error){
      console.error('Error deleting movie:', error);
    }
  }