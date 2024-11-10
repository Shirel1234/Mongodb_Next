'use client'
import Login from '@/app/components/Login'
import { createUser } from '@/app/services/userActive'
import IUser from '@/app/types/userSchema'
import React from 'react'

const Page = () => {
    const handleCreate = (userData: IUser) => {
        createUser(userData);
    };
    return (
        <div>
            <Login title="Sign Up" btn="Create A User" funUser={handleCreate} />
        </div>
    )
}

export default Page
