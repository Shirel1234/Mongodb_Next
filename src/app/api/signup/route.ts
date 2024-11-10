import connect from "@/app/lib/db/mongodb";
import User from "@/app/lib/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try{
        await connect();
        const {username, email, password} = await request.json();
        const existingUser = await User.findOne({ username, email, password });

        if (existingUser) {
            return NextResponse.json(
              { message: "User with this username or email already exists" },
              { status: 409 }
            );
          }

        const newUser = new User({username, email, password});
        await newUser.save();

        return NextResponse.json({message:'User created successfully', user: newUser},
            {status: 201}
        );
    }catch(error){
        return NextResponse.json("Error in creating user" +error);
    }
}
