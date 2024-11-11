import axios from "axios";

export const checkUser=async(user:{username: string; email:string; password:string})=>{
    try{
      const response = await axios.post('/api/login', user);
      const data = response.data;
      console.log('Login successfully:', data.message);
      
      if (data.message === "Login successfully") {
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
      console.log('User successfully created:', data);
      
      if (data.message === "User created successfully") {
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    }catch(error){
      console.error('Error creating user:', error);
      return { success: false, message: "User with this username or email already exists" };
    }
  }