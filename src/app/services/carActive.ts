import axios from "axios";

export const getCars=async()=>{
  try{
    const response = await axios.get('/api/car');
    const data = response.data;
    return data;
  }catch(error){
    console.error('Error get cars:', error);
  }
}

export const createCar=async(car:{make: string; model:string; year:string})=>{
    try{
      const response = await axios.post('/api/car', car);
      const data = response.data;
      console.log('Car created:', data);
      return data;
    }catch(error){
      console.error('Error creating car:', error);
    }
  }

  export const updateCar=async(id: string, car:{make: string; model:string; year:string})=>{
    try{
      const response = await axios.put(`/api/car${id}`, car);
      const data = response.data;
      console.log('Car updated:', data);
      return data;
    }catch(error){
      console.error('Error updating car:', error);
    }
  }

  export const deleteCar=async(id: string)=>{
    try{
      const response = await axios.delete(`/api/car/${id}`);
      const data = response.data;
      console.log('Car deleted:', data);
      return data;
    }catch(error){
      console.error('Error deleting car:', error);
    }
  }