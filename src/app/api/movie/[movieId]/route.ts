import connect from "@/app/lib/db/mongodb";
import Movie from "@/app/lib/models/Movie";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { movieId: string } }
  ) {
    await connect();
    const { movieId } = params;
    try {
      const deletedMovie = await Movie.findByIdAndDelete(movieId);
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
  
  export async function PUT(request: NextRequest, { params }: { params: { movieId: string } }
  ) {
    await connect();
    const { movieId } = params;
    const { title, director, releaseYear } =  await request.json();
    try {
      const updateMovie = await Movie.findByIdAndUpdate(movieId,
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