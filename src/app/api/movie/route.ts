import connect from "@/app/lib/db/mongodb";
import Movie from "@/app/lib/models/Movie";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await connect();
    try {
      const movies = await Movie.find({});
      return NextResponse.json({ movies: movies }, { status: 201 });
    } catch (error) {
      return NextResponse.json("Error in get movies" + error);
    }
  }

export async function POST(request: NextRequest){
    try{
        await connect();
        const {title, director, releaseYear} = await request.json();
        const existingMovie = await Movie.findOne({title, director, releaseYear});

        if (existingMovie) {
            return NextResponse.json(
              { message: "This movie already exists" },
              { status: 409 }
            );
          }

        const newMovie = new Movie({title, director, releaseYear});
        await newMovie.save();

        return NextResponse.json({message:'Movie created successfully', movie: newMovie},
            {status: 201}
        );
    }catch(error){
        return NextResponse.json("Error in creating movie" +error);
    }
}


