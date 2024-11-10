import axios from "axios";

export const checkUser=async(user:{username: string; email:string; password:string})=>{
    try{
      const response = await axios.post('/api/login', user);
      const data = response.data;
      console.log('Login successful:', data);
      
      if (data.message === "Login successful") {
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    }catch(error){
      console.error('Error during login:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  }

  
export const createUser=async(user:{username: string; email:string; password:string})=>{
    try{
      const response = await axios.post('/api/signup', user);
      const data = response.data;
      console.log('User created:', data);
      return data;
    }catch(error){
      console.error('Error creating user:', error);
    }
  }