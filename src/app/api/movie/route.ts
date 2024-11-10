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

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    await connect();
    const { id } = params;
    try {
      const deletedMovie = await Movie.findByIdAndDelete(id);
      if (!deletedMovie) {
        return NextResponse.json({ error: "Movie not found" }, { status: 404 });
      }
      return NextResponse.json(
        { message: "Movie deleted successfully" },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json("Error in deleting movie" + error);
    }
  }
  
  export async function PUT(request: NextRequest, { params }: { params: { id: string } }
  ) {
    await connect();
    const { id } = params;
    const { title, director, releaseYear } =  await request.json();
    try {
      const updateMovie = await Movie.findByIdAndUpdate(id,
          { title, director, releaseYear }, 
          { new: true, runValidators: true } 
      );
      if (!updateMovie) {
        return NextResponse.json({ error: "Movie not found" }, { status: 404 });
      }
      return NextResponse.json(
        { message: "Movie updated successfully" , car: updateMovie},
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json("Error in updating movie" + error);
    }
  }
