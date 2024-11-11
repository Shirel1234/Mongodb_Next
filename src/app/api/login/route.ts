import connect from "@/app/lib/db/mongodb";
import User from "@/app/lib/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const { username, email, password } = await request.json();
    const existingUser = await User.findOne({ username, email, password });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Login successfully",
        user: { username: existingUser.username },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json("Error in fetching posts" + error);
  }
}
