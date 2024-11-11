'use client'
import Login from '@/app/components/Login'
import { createUser } from '@/app/services/userActive'
import IUser from '@/app/types/userSchema'
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from 'react'

const Page = () => {
    const [message, setMessage] = useState<string>(''); 
    const router = useRouter();

    const handleCreate = async(userData: IUser) => {
        const response= await createUser(userData);
        console.log("gooood", response.success, response.message)
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
            <Login title="Sign Up" btn="Create A User" funUser={handleCreate} />
            <div className='flex justify-center'>
            {message && <p>{message}</p>} 
            </div>
            
        </div>
    )
}

export default Page
