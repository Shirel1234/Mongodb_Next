'use client'
import Login from "@/app/components/Login"
import { checkUser } from "@/app/services/userActive"
import IUser from "@/app/types/userSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
    const [message, setMessage] = useState<string>(''); 
    const router = useRouter();

    const handleCheckUser = async(userData: IUser) => {
       const response= await checkUser(userData);
       console.log("gooood", response.success)
       if (response.success) {
        setMessage(response.message);  
        setTimeout(() => {
          router.push('/pages/home'); 
        }, 2000);  
      } else {
        setMessage(response.message);  
      }
    };
    return (
        <div>
            <Login title="Login" btn="Sign in" funUser={handleCheckUser} />
            <div className='flex justify-center'>
            {message && <p>{message}</p>} 
            </div>
        </div>
    )
}

export default Page
