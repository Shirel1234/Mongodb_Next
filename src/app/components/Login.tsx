'use client'
import React, { useState } from 'react'

const Login = ({
    title,
    btn,
    funUser,
}: {
    title: string;
    btn: string;
    funUser: (userData: { username: string; email: string; password: string }) => void;
}) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCheckUser = () => {
        funUser({ username, email, password });
    }
    return (
        <div className='flex justify-center p-10'>
            <div className='w-[300px] h-[300px] flex flex-col items-center rounded border gap-5 bg-gray-300'>
                <h1 className='text-2xl font-bold mb-4'>{title}</h1>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="flex-grow p-2 rounded border border-gray-300 focus:outline-none"
                />
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="flex-grow p-2 rounded border border-gray-300 focus:outline-none"
                />
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="flex-grow p-2 rounded border border-gray-300 focus:outline-none"
                />
                <button onClick={handleCheckUser}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >{btn}</button>
            </div>
        </div>
    )
}

export default Login
