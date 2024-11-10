import axios from "axios";

export const getBooks=async()=>{
  try{
    const response = await axios.get('/api/book');
    const data = response.data.books;
    console.log("dataaaa" + data);
    return data;
  }catch(error){
    console.error('Error get books:', error);
  }
}

export const createBook=async(book:{title: string; author:string; rating:number})=>{
    try{
      const response = await axios.post('/api/book', book);
      const data = response.data;
      console.log('Book created:', data);
      return data;
    }catch(error){
      console.error('Error creating book:', error);
    }
  }

  export const updateBook=async(id: string, book:{title: string; author:string; rating:number})=>{
    try{
      const response = await axios.put(`/api/book/${id}`, book);
      const data = response.data;
      console.log('Book updated:', data);
      return data;
    }catch(error){
      console.error('Error updating book:', error);
    }
  }

  export const deleteBook=async(id: string)=>{
    try{
      const response = await axios.delete(`/api/book/${id}`);
      const data = response.data;
      console.log('Book deleted:', data);
      return data;
    }catch(error){
      console.error('Error deleting book:', error);
    }
  }